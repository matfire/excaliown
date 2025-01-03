package server

import (
	"github.com/go-chi/chi/v5"
)

func AddRoutes(router *chi.Mux) {
	serverRouter := chi.NewRouter()

	serverRouter.Get("/draw", DrawIndex)
	serverRouter.Post("/draw", DrawCreate)
	serverRouter.Put("/draw", DrawUpdate)
	serverRouter.Get("/draw/{id}", DrawShow)
	serverRouter.Delete("/draw/{id}", DrawDelete)

	router.Mount("/api", serverRouter)
}
