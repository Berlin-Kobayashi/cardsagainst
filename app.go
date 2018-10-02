package main

import (
	"encoding/json"
	"fmt"
	"github.com/DanShu93/cardsagainst/translator"
	"io/ioutil"
	"os"
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
		Exp:        c.Expansion,
		NumAnswers: c.NumAnswers,
		O:          c.Text,
		L1:         t.Translate(c.Text, "en", l1),
		L2:         t.Translate(c.Text, "en", l2),
	}
}

func (c Card) TranslateAnswer(l1, l2 string, t translator.Translator) TranslatedAnswer {
	return TranslatedAnswer{
		Exp: c.Expansion,
		O:   c.Text,
		L1:  t.Translate(c.Text, "en", l1),
		L2:  t.Translate(c.Text, "en", l2),
	}
}

type TranslatedQuestion struct {
	NumAnswers     int
	O, L1, L2, Exp string
}

type TranslatedAnswer struct {
	O, L1, L2, Exp string
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

	for _, c := range cs {
		switch c.CardType {
		case "Q":
			translatedQuestions = append(translatedQuestions, c.TranslateQuestion(os.Getenv(lang1), os.Getenv(lang2), t))
		default:
			translatedAnswers = append(translatedAnswers, c.TranslateAnswer(os.Getenv(lang1), os.Getenv(lang2), t))
		}
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
