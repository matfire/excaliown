package utils

import (
	"path"

	"github.com/adrg/xdg"
	_ "github.com/ncruces/go-sqlite3/embed"
	"github.com/ncruces/go-sqlite3/gormlite"
	"gorm.io/gorm"
)

func GetDB() (*gorm.DB, error) {
	db, err := gorm.Open(gormlite.Open(path.Join(xdg.DataHome, "excaliown", "database.db")), &gorm.Config{})
	return db, err
}
