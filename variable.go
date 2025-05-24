package main

import "fmt"

func coba() {
	var nilai = 90

	if nilai >= 90 {
		fmt.Println("Nilai A")
	} else if nilai >= 80 {
		fmt.Println("Nilai B")
	} else {
		fmt.Println("Nilai C atau di bawahnya")
	}
}

func main() {
	coba()
}
