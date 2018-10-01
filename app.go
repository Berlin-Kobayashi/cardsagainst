package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

const inputFileName = "cards.json"
const outputFileName = "out.txt"
const input = "INPUT"
const output = "OUTPUT"

func main() {
	cards, err := ioutil.ReadFile(os.Getenv(input) + "/" + inputFileName)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(os.Getenv(output)+"/"+outputFileName, cards, 0777)
	if err != nil {
		panic(err)
	}

	fmt.Println("DONE!")
}
