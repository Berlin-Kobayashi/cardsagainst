package imagesearch

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
)

type Image struct {
	Value []struct {
		ContentUrl string
	}
}

func SearchImage(text string) string {
	u := &url.URL{Path: "q=" + text + "&count=1&offset=0&mkt=en-us&safeSearch=Strict"}

	r, err := http.NewRequest(http.MethodGet, "https://api.cognitive.microsoft.com/bing/v7.0/images/search?"+u.EscapedPath(), nil)
	if err != nil {
		return ""
	}

	r.Header.Add("Ocp-Apim-Subscription-Key", os.Getenv("BING"))

	resp, err := http.DefaultClient.Do(r)
	if err != nil {
		return ""
	}

	respBody, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return ""
	}

	var img Image
	err = json.Unmarshal(respBody, &img)
	if err != nil {
		return ""
	}

	if len(img.Value) > 0 {
		return img.Value[0].ContentUrl
	}

	return ""
}
