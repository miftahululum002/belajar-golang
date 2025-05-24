package main

import (
	"backend/be/be/config"
	"backend/be/be/database"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	database.InitDB()
	//inisialiasai Gin
	router := gin.Default()

	//membuat route dengan method GET
	router.GET("/", func(c *gin.Context) {

		//return response JSON
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})
	var port = config.GetEnv("APP_PORT", "3000")
	//mulai server dengan port 3000
	router.Run(":" + port)
}
