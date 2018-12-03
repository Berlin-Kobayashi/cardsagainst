package translator

import (
	"cloud.google.com/go/translate"
	"golang.org/x/net/context"
	"golang.org/x/text/language"
	"log"
	"strings"
)

type Translator struct {
	Ctx    context.Context
	Client *translate.Client
}

func New() Translator {
	ctx := context.Background()

	client, err := translate.NewClient(ctx)
	if err != nil {
		panic(err)
	}

	return Translator{Ctx: ctx, Client: client}
}

func (s Translator) Translate(text, from, to string) string {
	target, err := language.Parse(to)
	if err != nil {
		log.Fatalf("Failed to parse target language: %v", err)
	}

	source, err := language.Parse(from)
	if err != nil {
		log.Fatalf("Failed to parse source language: %v", err)
	}

	opts := translate.Options{Format: translate.Text, Model: "nmt", Source: source}

	translations, err := s.Client.Translate(s.Ctx, []string{strings.ToLower(text)}, target, &opts)
	if err != nil {
		log.Fatalf("Failed to Translate text: %v", err)
	}

	return translations[0].Text
}
