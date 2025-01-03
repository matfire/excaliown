package server

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/matfire/excaliown/models"
	"github.com/matfire/excaliown/server/types"
	"github.com/matfire/excaliown/server/utils"
)

func DrawIndex(w http.ResponseWriter, r *http.Request) {
	db, err := utils.GetDB()
	if err != nil {
		panic("could not get db")
	}
	var data []models.Draw

	db.Find(&data)
	marshaled, err := json.Marshal(data)
	if err != nil {
		panic("could not serialize list")
	}
	w.Write(marshaled)
}

func DrawShow(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	convInt, _ := strconv.ParseUint(id, 10, 32)
	db, err := utils.GetDB()
	if err != nil {
		panic("could not get db")
	}
	var data = models.Draw{ID: uint(convInt)}

	db.First(&data)
	marshaled, err := json.Marshal(data)
	if err != nil {
		panic("could not marshal json")
	}
	w.Write(marshaled)
}

func DrawCreate(w http.ResponseWriter, r *http.Request) {

	var body types.DrawRequestBody
	b, err := io.ReadAll(r.Body)

	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("could not read body"))
	}
	err = json.Unmarshal(b, &body)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("could not parse body into structure"))
	}
	db, err := utils.GetDB()

	draw := models.Draw{Name: body.Name, Data: body.Data}
	db.Create(&draw)
	marshaled, err := json.Marshal(draw)
	w.WriteHeader(201)
	w.Write(marshaled)
}

func DrawUpdate(w http.ResponseWriter, r *http.Request) {
	var body types.DrawRequestBody
	b, err := io.ReadAll(r.Body)

	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("could not read body"))
	}
	err = json.Unmarshal(b, &body)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("could not parse body into structure"))
	}
	db, err := utils.GetDB()
	instance := models.Draw{ID: body.ID}
	db.First(&instance)
	instance.Name = body.Name
	instance.Data = body.Data
	db.Save(instance)
	response := types.DefaultResponse{Ok: true, Message: "draw updated"}
	b, err = json.Marshal(response)
	w.WriteHeader(200)
	w.Write(b)
}

func DrawDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	convInt, _ := strconv.ParseUint(id, 10, 32)
	db, err := utils.GetDB()
	if err != nil {
		panic("could not get db")
	}
	var data = models.Draw{ID: uint(convInt)}
	db.Delete(&data)

	response := types.DefaultResponse{Ok: true, Message: "Draw Deleted"}
	b, err := json.Marshal(response)

	w.WriteHeader(200)
	w.Write(b)
}
