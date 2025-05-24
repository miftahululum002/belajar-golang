package main

import (
	"backend/be/be/config"
	"backend/be/be/database"
	"backend/be/be/routes"
)

func main() {
	config.LoadEnv()

	database.InitDB()
	//inisialiasai Gin
	r := routes.SetupRouter()

	var port = config.GetEnv("APP_PORT", "3000")
	//mulai server dengan port 3000
	r.Run(":" + port)
}
