package routes

import (
	"backend/be/be/controllers"
	"backend/be/be/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {

	//initialize gin
	router := gin.Default()

	// set up CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// route register
	router.POST("/api/register", controllers.Register)
	router.POST("/api/login", controllers.Login)

	// users

	router.GET("/api/users", middlewares.AuthMiddleware(), controllers.FindUsers)
	router.POST("/api/users", middlewares.AuthMiddleware(), controllers.CreateUser)
	router.GET("/api/users/:id", middlewares.AuthMiddleware(), controllers.FindUserById)
	router.PUT("/api/users/:id", middlewares.AuthMiddleware(), controllers.UpdateUser)
	router.DELETE("/api/users/:id", middlewares.AuthMiddleware(), controllers.DeleteUser)

	//books
	router.GET("/api/books", middlewares.AuthMiddleware(), controllers.FindBooks)
	router.POST("/api/books", middlewares.AuthMiddleware(), controllers.CreateBook)
	router.GET("/api/books/:id", middlewares.AuthMiddleware(), controllers.FindBookById)
	router.PUT("/api/books/:id", middlewares.AuthMiddleware(), controllers.UpdateBook)

	router.DELETE("/api/books/:id", middlewares.AuthMiddleware(), controllers.DeleteBook)
	return router
}
