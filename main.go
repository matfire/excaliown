package main

import (
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/adrg/xdg"
	"github.com/charmbracelet/log"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/matfire/excaliown/models"
	"github.com/matfire/excaliown/server"
	"github.com/matfire/excaliown/server/utils"
	"github.com/matfire/excaliown/ui"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

func main() {

	log.Info("Reading config information")
	pflag.Int("port", 8080, "specify port for service")
	pflag.Parse()
	viper.BindPFlags(pflag.CommandLine)
	viper.SetDefault("PORT", 8080)
	viper.SetEnvPrefix("EXC")
	viper.BindEnv("PORT")
	viper.SetConfigName("excaliown")
	viper.AddConfigPath(path.Join(xdg.ConfigHome, "excaliown"))
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {

		} else {
			panic(err)
		}
	}
	log.Info("Initialising Data Directory")
	dataPath := path.Join(xdg.DataHome, "excaliown")
	configPath := path.Join(xdg.ConfigHome, "excaliown")
	if err := os.MkdirAll(dataPath, os.ModePerm); err != nil {
		panic(err)
	}
	log.Info("Initialising Config Directory")
	if err := os.MkdirAll(configPath, os.ModePerm); err != nil {
		panic(err)
	}
	log.Info("Initialising DB")
	db, err := utils.GetDB()
	if err != nil {
		panic("could not connect to database")
	}
	db.AutoMigrate(&models.Draw{})

	log.Info("Setting up routes")
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"HEAD", "GET", "POST", "DELETE", "PUT"},
	}))

	ui.AddRoutes(router)
	server.AddRoutes(router)

	port := viper.GetInt("PORT")

	log.Info(fmt.Sprintf("Server listening on port %d", port))
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), router)
	if err != nil {
		panic(err)
	}
}
