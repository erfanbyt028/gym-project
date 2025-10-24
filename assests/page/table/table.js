document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.td-color');

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
});


// 


document.addEventListener('DOMContentLoaded', function() {
    const sportRows = document.querySelectorAll('.t-table');

    sportRows.forEach(row => {
        row.addEventListener('click', function() {
            const sportName = this.textContent.trim();
            alert(`اطلاعات بیشتر درباره ${sportName}: \nزمان: ۱۷:۰۰ تا ۱۹:۰۰ \nمربی: علی محمدی \nظرفیت: ۱۰ نفر`);
        });
    });
});


// 


document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('sportFilter');
    const rows = document.querySelectorAll('tbody tr');

    filterSelect.addEventListener('change', function() {
        const selectedSport = this.value;

        rows.forEach(row => {
            const sportName = row.querySelector('.t-table').textContent.trim();
            if (selectedSport === 'all' || sportName === selectedSport) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});


// 


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const rows = document.querySelectorAll('tbody tr');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// 





document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const sportName = row.querySelector('.t-table').textContent.trim();
        const activeClasses = row.querySelectorAll('.td-color img').length;
        console.log(`${sportName}: ${activeClasses} کلاس فعال`);
    });
});

// 



document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.td-color');

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.toggle('selected');
            saveSelection();
        });
    });

    function saveSelection() {
        const selectedCells = document.querySelectorAll('.selected');
        const selectedDays = Array.from(selectedCells).map(cell => cell.textContent.trim());
        localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
    }

    function loadSelection() {
        const selectedDays = JSON.parse(localStorage.getItem('selectedDays')) || [];
        cells.forEach(cell => {
            if (selectedDays.includes(cell.textContent.trim())) {
                cell.classList.add('selected');
            }
        });
    }

    loadSelection();
});


// 


document.addEventListener('DOMContentLoaded', function() {
    const reserveButtons = document.querySelectorAll('.reserve-btn');

    // بارگذاری رزروهای ذخیره شده
    loadReservations();

    // اضافه کردن رویداد کلیک به دکمه‌های رزرو
    reserveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cell = this.closest('td');
            const day = cell.cellIndex - 1; // شماره روز (۰ تا ۶)
            const sport = cell.closest('tr').querySelector('.t-table').textContent.trim();

            // تغییر وضعیت رزرو
            toggleReservation(sport, day, cell);
        });
    });

    // تابع تغییر وضعیت رزرو
    function toggleReservation(sport, day, cell) {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || {};
        const key = `${sport}-${day}`;

        if (reservations[key]) {
            // اگر قبلاً رزرو شده بود، لغو رزرو
            delete reservations[key];
            cell.classList.remove('reserved');
            alert(`رزرو ${sport} در روز ${getDayName(day)} لغو شد.`);
        } else {
            // اگر رزرو نشده بود، رزرو کن
            reservations[key] = true;
            cell.classList.add('reserved');
            alert(`رزرو ${sport} در روز ${getDayName(day)} با موفقیت انجام شد.`);
        }

        // ذخیره تغییرات در LocalStorage
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    // تابع بارگذاری رزروهای ذخیره شده
    function loadReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || {};
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const sport = row.querySelector('.t-table').textContent.trim();
            const cells = row.querySelectorAll('.td-color');

            cells.forEach((cell, index) => {
                const day = index;
                const key = `${sport}-${day}`;

                if (reservations[key]) {
                    cell.classList.add('reserved');
                }
            });
        });
    }

    // تابع تبدیل شماره روز به نام روز
    function getDayName(day) {
        const days = ["شنبه", "یک‌شنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه", "جمعه"];
        return days[day];
    }
});


function updateReservationsList() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || {};
    const list = document.getElementById('reservations');
    list.innerHTML = '';

    for (const key in reservations) {
        if (reservations[key]) {
            const [sport, day] = key.split('-');
            const listItem = document.createElement('li');
            listItem.textContent = `${sport} در روز ${getDayName(day)}`;
            list.appendChild(listItem);
        }
    }
}

// فراخوانی تابع هنگام کلیک روی دکمه رزرو
reserveButtons.forEach(button => {
    button.addEventListener('click', function() {
        toggleReservation(sport, day, cell);
        updateReservationsList(); // به‌روزرسانی لیست رزروها
    });
});

// بارگذاری لیست رزروها هنگام لود صفحه
updateReservationsList();

document.getElementById('clear-reservations').addEventListener('click', function() {
    localStorage.removeItem('reservations');
    alert('همه رزروها پاک شدند.');
    updateReservationsList();
    location.reload(); // بارگذاری مجدد صفحه
});