document.addEventListener("DOMContentLoaded", () => {
    //Date
    try {
        document.querySelector("span.date").textContent = new Date().getFullYear();
    } catch (error) {
        
    }

    
  
})