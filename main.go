package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/matfire/excaliown/models"
	"github.com/matfire/excaliown/server"
	"github.com/matfire/excaliown/server/utils"
	"github.com/matfire/excaliown/ui"
)

func main() {

	db, err := utils.GetDB()
	if err != nil {
		panic("could not connect to database")
	}
	db.AutoMigrate(&models.Draw{})
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"HEAD", "GET", "POST", "DELETE", "PUT"},
	}))

	ui.AddRoutes(router)
	server.AddRoutes(router)
	err = http.ListenAndServe(":8080", router)
	if err != nil {
		panic(err)
	}
}
