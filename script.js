const hotels = [
  {
    name: "The Baobab House", place: "Watamu, Kenya", region: "Africa", rating: "4.98",
    price: 28500, label: "BEACHFRONT", type: "Coastal escape",
    description: "A private Swahili-inspired hideaway between the palms and the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
    alt: "Luxury resort nestled in tropical greenery beside a pool"
  },
  {
    name: "Serengeti House", place: "Arusha, Tanzania", region: "Africa", rating: "4.96",
    price: 41800, label: "WILDERNESS", type: "Safari lodge",
    description: "Quiet luxury, wide-open skies and the wild landscapes of Tanzania.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
    alt: "Golden hour over a wide, peaceful African savanna"
  },
  {
    name: "Uma Ubud Retreat", place: "Ubud, Bali", region: "Asia", rating: "4.94",
    price: 34200, label: "HIDDEN GEM", type: "Jungle retreat",
    description: "A slow-living sanctuary tucked among emerald rice terraces and palms.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
    alt: "Tropical Balinese landscape with lush greenery and temple architecture"
  },
  {
    name: "Casa Bellavita", place: "Amalfi Coast, Italy", region: "Europe", rating: "4.97",
    price: 62300, label: "SEA VIEW", type: "Coastal hideaway",
    description: "Lemon-scented mornings, terracotta rooftops and a view for the ages.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
    alt: "Bright blue water and pastel coastal buildings along the Mediterranean"
  },
  {
    name: "The Aster House", place: "Marrakech, Morocco", region: "Africa", rating: "4.91",
    price: 36700, label: "DESIGN HOTEL", type: "Riad",
    description: "An intimate riad of intricate details, garden courtyards and rooftop sunsets.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=85",
    alt: "Traditional Moroccan architecture with warm, intricate details"
  },
  {
    name: "Casa Solana", place: "Tulum, Mexico", region: "Americas", rating: "4.93",
    price: 39700, label: "SLOW LIVING", type: "Jungle & sea",
    description: "Barefoot days, a private stretch of coastline and nowhere else to be.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
    alt: "Sun loungers beside an inviting blue swimming pool in a tropical resort"
  }
];

const roomCategories = [
  { name: "The Hideaway", description: "A beautifully considered room for two.", price: 18500, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=240&q=80", alt: "Warm, elegant king bedroom" },
  { name: "The Suite", description: "More space, more privacy, more to love.", price: 32600, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=240&q=80", alt: "Quiet luxury suite with a comfortable seating area" },
  { name: "The Private Villa", description: "Your own little world, made for sharing.", price: 58400, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=240&q=80", alt: "Open and airy private villa interior" }
];

const testimonials = [
  { quote: "Some places just get it right. The villa, the people, the quiet mornings — it all felt like it had been chosen just for us.", name: "Amara M.", initials: "AM", place: "Arusha, Tanzania · Serengeti House" },
  { quote: "The loveliest kind of escape. Thoughtful from the first message to the last sunset, and somehow even better than the photographs.", name: "James & Nia", initials: "JN", place: "Watamu, Kenya · The Baobab House" },
  { quote: "We came home feeling like we had really been somewhere. Beautiful details, genuinely warm people, and a view we still talk about.", name: "Sofia R.", initials: "SR", place: "Amalfi Coast, Italy · Casa Bellavita" }
];

const STORAGE_KEY = "aurelia-booking-requests";
const formatKsh = amount => `KSh ${Number(amount).toLocaleString("en-KE")}`;
const getBookings = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not read saved booking requests.", error);
    return [];
  }
};

function renderHotels(region = "All") {
  const grid = document.getElementById("hotelGrid");
  const visibleHotels = region === "All" ? hotels : hotels.filter(hotel => hotel.region === region);
  if (!visibleHotels.length) {
    grid.innerHTML = '<p class="empty-state">No stays found in this region just yet.</p>';
    return;
  }
  grid.innerHTML = visibleHotels.map(hotel => `
    <article class="hotel-card">
      <div class="hotel-photo">
        <img src="${hotel.image}" alt="${hotel.alt}" loading="lazy">
        <span class="hotel-tag">${hotel.label}</span>
        <button class="hotel-heart" type="button" aria-label="Save ${hotel.name}" aria-pressed="false">♡</button>
      </div>
      <div class="hotel-info">
        <p class="hotel-location">${hotel.place} <span>·</span> ${hotel.type}</p>
        <div class="hotel-title-row"><h3>${hotel.name}</h3><span class="rating">★ ${hotel.rating}</span></div>
        <p class="hotel-description">${hotel.description}</p>
        <div class="hotel-bottom"><span class="hotel-price">${formatKsh(hotel.price)} <small>/ night</small></span><a class="hotel-book" href="#booking" data-hotel="${hotel.name}">View stay ↗</a></div>
      </div>
    </article>
  `).join("");
}

function renderRoomCategories() {
  document.getElementById("roomCategories").innerHTML = roomCategories.map(room => `
    <article class="room-category">
      <img src="${room.image}" alt="${room.alt}" loading="lazy">
      <h3>${room.name}</h3><p>${room.description}</p>
      <strong>${formatKsh(room.price)} <small>/ night</small></strong>
    </article>
  `).join("");
}

function renderDashboard() {
  const bookings = getBookings();
  const totalValue = bookings.reduce((sum, booking) => sum + Number(booking.total || 0), 0);
  document.getElementById("dashboardStats").innerHTML = `
    <div class="stat-card"><strong>${bookings.length}</strong><span>Booking requests</span></div>
    <div class="stat-card"><strong>${bookings.filter(item => item.status === "Pending").length}</strong><span>Awaiting response</span></div>
    <div class="stat-card"><strong>${formatKsh(totalValue)}</strong><span>Requested trip value</span></div>
  `;
  const rows = document.getElementById("bookingRows");
  if (!bookings.length) {
    rows.innerHTML = '<tr class="empty-row"><td colspan="8">No booking requests yet. New requests will appear here.</td></tr>';
    return;
  }
  rows.innerHTML = bookings.map(booking => `
    <tr>
      <td>${escapeHtml(booking.name)}<br><span style="color:#85867e">${escapeHtml(booking.email)}</span></td>
      <td>${escapeHtml(booking.hotel)}</td>
      <td>${escapeHtml(booking.roomType)}</td>
      <td>${escapeHtml(booking.checkin)} → ${escapeHtml(booking.checkout)}</td>
      <td>${Number(booking.guests)}</td>
      <td>${formatKsh(booking.total)}</td>
      <td><span class="status-pill">${escapeHtml(booking.status || "Pending")}</span></td>
      <td><button class="delete-booking" type="button" data-id="${escapeHtml(booking.id)}">Remove</button></td>
    </tr>
  `).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function setDateMinimums() {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");
  checkin.min = localToday;
  checkout.min = localToday;
  checkin.addEventListener("change", () => {
    const nextDay = new Date(`${checkin.value}T12:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    checkout.min = nextDay.toISOString().slice(0, 10);
    if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
  });
}

function init() {
  const destination = document.getElementById("destination");
  hotels.forEach((hotel, index) => {
    const option = document.createElement("option");
    option.value = hotel.name;
    option.textContent = `${hotel.name} — ${hotel.place}`;
    if (index === 0) option.textContent = `${hotel.place} — ${hotel.name}`;
    destination.append(option);
  });
  const roomSelect = document.getElementById("roomType");
  roomCategories.forEach(room => {
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = `${room.name} — ${formatKsh(room.price)} / night`;
    roomSelect.append(option);
  });
  renderHotels();
  renderRoomCategories();
  renderDashboard();
  setDateMinimums();
  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll(".filter-chip").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-chip.active")?.classList.remove("active");
      button.classList.add("active");
      renderHotels(button.dataset.filter);
    });
  });

  document.getElementById("hotelGrid").addEventListener("click", event => {
    const favorite = event.target.closest(".hotel-heart");
    if (favorite) {
      const saved = favorite.classList.toggle("saved");
      favorite.textContent = saved ? "♥" : "♡";
      favorite.setAttribute("aria-pressed", String(saved));
      return;
    }
    const hotelLink = event.target.closest("[data-hotel]");
    if (hotelLink) {
      destination.value = hotelLink.dataset.hotel;
      document.getElementById("checkin").focus();
    }
  });

  document.getElementById("bookingForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const notice = document.getElementById("formNotice");
    if (!form.reportValidity()) return;

    const checkinValue = document.getElementById("checkin").value;
    const checkoutValue = document.getElementById("checkout").value;
    const checkinDate = new Date(`${checkinValue}T12:00:00`);
    const checkoutDate = new Date(`${checkoutValue}T12:00:00`);
    if (checkoutDate <= checkinDate) {
      notice.textContent = "Please choose a check-out date after check-in.";
      return;
    }

    const selectedHotel = hotels.find(hotel => hotel.name === destination.value);
    const selectedRoom = roomCategories.find(room => room.name === document.getElementById("roomType").value);
    if (!selectedHotel) {
      notice.textContent = "Please select a destination to continue.";
      destination.focus();
      return;
    }
    if (!selectedRoom) {
      notice.textContent = "Please choose a room category to continue.";
      document.getElementById("roomType").focus();
      return;
    }
    const nights = Math.round((checkoutDate - checkinDate) / 86400000);
    const request = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      hotel: selectedHotel.name,
      place: selectedHotel.place,
      roomType: selectedRoom.name,
      checkin: checkinValue,
      checkout: checkoutValue,
      guests: Number(document.getElementById("guests").value),
      total: nights * selectedRoom.price,
      status: "Pending",
      name: document.getElementById("guestName").value.trim(),
      email: document.getElementById("guestEmail").value.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const bookings = getBookings();
      bookings.unshift(request);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Could not save booking request.", error);
      notice.textContent = "We couldn't save your request on this device. Please contact us by email or phone.";
      return;
    }
    renderDashboard();
    notice.textContent = `Request received for ${request.hotel}. Estimated total: ${formatKsh(request.total)} for ${nights} night${nights === 1 ? "" : "s"}.`;
    showToast("Your booking request is saved. We’ll be in touch.");
    form.reset();
    document.getElementById("guests").value = "2";
  });

  document.getElementById("bookingRows").addEventListener("click", event => {
    const button = event.target.closest(".delete-booking");
    if (!button) return;
    try {
      const bookings = getBookings().filter(booking => booking.id !== button.dataset.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      renderDashboard();
      showToast("Booking request removed.");
    } catch (error) {
      console.error("Could not remove booking request.", error);
      showToast("Could not remove request. Please try again.");
    }
  });

  document.getElementById("exportBookings").addEventListener("click", () => {
    const bookings = getBookings();
    if (!bookings.length) {
      showToast("There are no booking requests to export.");
      return;
    }
    const columns = ["name", "email", "hotel", "place", "checkin", "checkout", "guests", "total", "status"];
    const csv = [columns.join(","), ...bookings.map(booking =>
      columns.map(column => `"${String(booking[column] ?? "").replace(/"/g, '""')}"`).join(",")
    )].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "aurelia-booking-requests.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  let testimonialIndex = 0;
  const updateTestimonial = () => {
    const item = testimonials[testimonialIndex];
    document.getElementById("testimonialQuote").textContent = item.quote;
    document.getElementById("testimonialName").textContent = item.name;
    document.getElementById("testimonialName").previousElementSibling.textContent = item.initials;
    document.getElementById("testimonialPlace").textContent = item.place;
    document.getElementById("testimonialIndex").innerHTML = `${String(testimonialIndex + 1).padStart(2, "0")} <i>/</i> ${String(testimonials.length).padStart(2, "0")}`;
  };
  document.getElementById("testimonialPrev").addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
  });
  document.getElementById("testimonialNext").addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  });

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

init();
