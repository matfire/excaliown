package types

type DrawRequestBody struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Data string `json:"data"`
}
