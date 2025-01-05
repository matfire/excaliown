package utils

import (
	"path"

	"github.com/adrg/xdg"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(path.Join(xdg.DataHome, "excaliown", "database.db")), &gorm.Config{})
	return db, err
}
