package structs

// Struct ini digunakan untuk menampilkan data sebagai response API
type BookResponse struct {
	Id        uint    `json:"id"`
	Title     string  `json:"title"`
	Code      string  `json:"code"`
	Author    string  `json:"author"`
	Year      uint    `json:"year"`
	Synapsis  string  `json:"synapsis"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
	Token     *string `json:"token,omitempty"`
}

// Struct ini digunakan untuk menerima data saat proses create data
type BookCreateRequest struct {
	Title    string `json:"title" binding:"required"`
	Code     string `json:"code" binding:"required" gorm:"unique;not null"`
	Author   string `json:"author,omitempty"`
	Year     uint   `json:"year,omitempty"`
	Synapsis string `json:"synapsis,omitempty"`
}

// Struct ini digunakan untuk menerima data saat proses update data
type BookUpdateRequest struct {
	Title    string `json:"title" binding:"required"`
	Code     string `json:"code" binding:"required" gorm:"unique;not null"`
	Author   string `json:"author,omitempty"`
	Year     uint   `json:"year,omitempty"`
	Synapsis string `json:"synapsis,omitempty"`
}
