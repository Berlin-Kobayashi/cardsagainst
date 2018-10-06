package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/DanShu93/cardsagainst/imagesearch"
	"github.com/DanShu93/cardsagainst/translator"
	"io/ioutil"
	"os"
	"strings"
)

const inputCardsFileName = "cards.json"
const outputQuestionsFileName = "q.json"
const outputAnswersFileName = "a.json"
const input = "INPUT"
const output = "OUTPUT"
const lang1 = "LANG1"
const lang2 = "LANG2"

type Card struct {
	Id, NumAnswers            int
	CardType, Text, Expansion string
}

func (c Card) TranslateQuestion(l1, l2 string, t translator.Translator) TranslatedQuestion {
	return TranslatedQuestion{
		I:          c.Id,
		Exp:        c.Expansion,
		NumAnswers: c.NumAnswers,
		O:          c.Text,
		L1:         toUpper(t.Translate(c.Text, "en", l1)),
		L2:         toUpper(t.Translate(c.Text, "en", l2)),
		Pic:        imagesearch.SearchImage(c.Text),
	}
}

func (c Card) TranslateAnswer(l1, l2 string, t translator.Translator) TranslatedAnswer {
	return TranslatedAnswer{
		I:   c.Id,
		Exp: c.Expansion,
		O:   c.Text,
		L1:  toUpper(t.Translate(c.Text, "en", l1)),
		L2:  toUpper(t.Translate(c.Text, "en", l2)),
		Pic: imagesearch.SearchImage(c.Text),
	}
}

type TranslatedQuestion struct {
	NumAnswers, I       int
	O, L1, L2, Exp, Pic string
}

type TranslatedAnswer struct {
	I                   int
	O, L1, L2, Exp, Pic string
}

func toUpper(in string) string {
	out := []byte(in)
	if alphaOnly(out[0]) {
		out[0] = bytes.ToUpper([]byte{out[0]})[0]
	}

	return string(out)
}

func alphaOnly(char byte) bool {
	alpha := "abcdefghijklmnopqrstuvwxyz"
	if !strings.Contains(alpha, strings.ToLower(string(char))) {
		return false
	}
	return true
}

func main() {
	t := translator.New()

	cards, err := ioutil.ReadFile(os.Getenv(input) + "/" + inputCardsFileName)
	if err != nil {
		panic(err)
	}

	var cs []Card

	err = json.Unmarshal(cards, &cs)
	if err != nil {
		panic(err)
	}

	translatedQuestions := make([]TranslatedQuestion, 0)
	translatedAnswers := make([]TranslatedAnswer, 0)

	for i, c := range cs {
		switch c.CardType {
		case "Q":
			q := c.TranslateQuestion(os.Getenv(lang1), os.Getenv(lang2), t)
			translatedQuestions = append(translatedQuestions, q)
			fmt.Printf("+%v\n", q)
		default:
			a := c.TranslateAnswer(os.Getenv(lang1), os.Getenv(lang2), t)
			translatedAnswers = append(translatedAnswers, a)
			fmt.Printf("+%v\n", a)
		}

		fmt.Println(i)
	}

	o, err := json.Marshal(translatedQuestions)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(os.Getenv(output)+"/"+outputQuestionsFileName, o, 0777)
	if err != nil {
		panic(err)
	}

	o, err = json.Marshal(translatedAnswers)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(os.Getenv(output)+"/"+outputAnswersFileName, o, 0777)
	if err != nil {
		panic(err)
	}

	fmt.Println("DONE!")
}
