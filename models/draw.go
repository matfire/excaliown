package models

import (
	"gorm.io/gorm"
)

type Draw struct {
	gorm.Model
	ID   uint   `gorm:"primarykey, autoIncrement", json:"id"`
	Name string `json:"name"`
	Data string `json:"data"`
}
