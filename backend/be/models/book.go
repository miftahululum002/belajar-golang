package models

import (
	"time"
)

type Book struct {
	Id        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Code      string    `json:"code" gorm:"unique;not null"`
	Author    string    `json:"author"`
	Year      uint      `json:"year"`
	Synapsis  string    `json:"synapsis" gorm:"type:text"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
