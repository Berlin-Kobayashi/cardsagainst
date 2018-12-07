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

const cardsFileName = "cards.json"
const input = "INPUT"
const output = "OUTPUT"
const lang1 = "LANG1"
const lang2 = "LANG2"

type Card struct {
	Type, Content string
}

func (c Card) Translate(l1, l2 string, t translator.Translator) TranslatedCard {
	return TranslatedCard{
		Type: c.Type,
		L1:   toUpper(t.Translate(c.Content, "en", l1)),
		L2:   toUpper(t.Translate(c.Content, "en", l2)),
		O:    c.Content,
		Pic:  imagesearch.SearchImage(c.Content),
	}
}

type TranslatedCard struct {
	O, L1, L2, Type, Pic string
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

	cards, err := ioutil.ReadFile(os.Getenv(input) + "/" + cardsFileName)
	if err != nil {
		panic(err)
	}

	var cs []Card

	err = json.Unmarshal(cards, &cs)
	if err != nil {
		panic(err)
	}

	translatedCards := make([]TranslatedCard, 0)

	for i, c := range cs {
		translatedCard := c.Translate(os.Getenv(lang1), os.Getenv(lang2), t)
		translatedCards = append(translatedCards, translatedCard)
		fmt.Printf("+%v\n", translatedCard)

		fmt.Println(i)
	}

	o, err := json.Marshal(translatedCards)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(os.Getenv(output)+"/"+cardsFileName, o, 0777)
	if err != nil {
		panic(err)
	}

	fmt.Println("DONE!")
}
