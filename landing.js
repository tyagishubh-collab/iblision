// Optional: Simple testimonial slider animation

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showNextTestimonial() {
  testimonials[currentTestimonial].style.display = 'none';
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  testimonials[currentTestimonial].style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(showNextTestimonial, 3000);
});
