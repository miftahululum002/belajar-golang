package controllers

import (
	"backend/be/be/database"
	"backend/be/be/helpers"
	"backend/be/be/models"
	"backend/be/be/structs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FindBooks(c *gin.Context) {

	// Inisialisasi slice untuk menampung data user
	var books []models.Book

	// Ambil data user dari database
	database.DB.Find(&books)

	// Kirimkan response sukses dengan data user
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Lists Data Books",
		Data:    books,
	})
}

func CreateBook(c *gin.Context) {

	//struct user request
	var req = structs.BookCreateRequest{}

	// Bind JSON request ke struct UserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Inisialisasi user baru
	book := models.Book{
		Title:    req.Title,
		Code:     req.Code,
		Author:   req.Author,
		Year:     req.Year,
		Synapsis: req.Synapsis,
	}

	// Simpan user ke database
	if err := database.DB.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create book",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Kirimkan response sukses
	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Data created successfully",
		Data: structs.BookResponse{
			Id:        book.Id,
			Title:     book.Title,
			Code:      book.Code,
			Author:    book.Author,
			Year:      book.Year,
			Synapsis:  book.Synapsis,
			CreatedAt: book.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: book.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})

}

func FindBookById(c *gin.Context) {

	// Ambil ID object dari parameter URL
	id := c.Param("id")

	// Inisialisasi object
	var book models.Book

	// Cari object berdasarkan ID
	if err := database.DB.First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Data not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Kirimkan response sukses dengan data user
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Data Found",
		Data: structs.BookResponse{
			Id:        book.Id,
			Title:     book.Title,
			Code:      book.Code,
			Author:    book.Author,
			Year:      book.Year,
			Synapsis:  book.Synapsis,
			CreatedAt: book.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: book.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})

}

func UpdateBook(c *gin.Context) {

	// Ambil ID dari parameter URL
	id := c.Param("id")

	// Inisialisasi object
	var object models.Book

	// Cari user berdasarkan ID
	if err := database.DB.First(&object, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Data not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	//struct user request
	var req = structs.BookUpdateRequest{}

	// Bind JSON request ke struct UserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Update object dengan data baru
	object.Title = req.Title
	object.Code = req.Code
	object.Author = req.Author
	object.Year = req.Year
	object.Synapsis = req.Synapsis

	// Simpan perubahan ke database
	if err := database.DB.Save(&object).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update data",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Kirimkan response sukses
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Data updated successfully",
		Data: structs.BookResponse{
			Id:        object.Id,
			Title:     object.Title,
			Code:      object.Code,
			Author:    object.Author,
			Year:      object.Year,
			Synapsis:  object.Synapsis,
			CreatedAt: object.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: object.UpdatedAt.Format("2006-01-02 15:04:05"),
		},
	})
}

func DeleteBook(c *gin.Context) {

	// Ambil ID object dari parameter URL
	id := c.Param("id")

	// Inisialisasi user
	var object models.Book

	// Cari user berdasarkan ID
	if err := database.DB.First(&object, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Data not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Hapus user dari database
	if err := database.DB.Delete(&object).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete data",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Kirimkan response sukses
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Data deleted successfully",
	})
}
