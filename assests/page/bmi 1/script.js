// Modern BMI Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const ageInput = document.getElementById('age');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsSection = document.getElementById('results-section');
    const bmiNumber = document.getElementById('bmi-number');
    const bmiStatus = document.getElementById('bmi-status');
    const chartIndicator = document.getElementById('chart-indicator');
    const recommendations = document.getElementById('recommendations');

    // BMI Categories
    const bmiCategories = {
        underweight: {
            min: 0,
            max: 18.5,
            label: 'کمبود وزن',
            color: '#74b9ff',
            gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)',
            recommendations: [
                'با یک متخصص تغذیه مشورت کنید',
                'برنامه غذایی مناسب برای افزایش وزن دریافت کنید',
                'تمرینات قدرتی را در برنامه خود قرار دهید',
                'وعده‌های غذایی منظم داشته باشید'
            ]
        },
        normal: {
            min: 18.5,
            max: 24.9,
            label: 'وزن نرمال',
            color: '#00b894',
            gradient: 'linear-gradient(135deg, #00b894, #00a085)',
            recommendations: [
                'وزن فعلی خود را حفظ کنید',
                'برنامه ورزشی منظم داشته باشید',
                'رژیم غذایی متعادل را ادامه دهید',
                'سلامت عمومی خود را کنترل کنید'
            ]
        },
        overweight: {
            min: 25,
            max: 29.9,
            label: 'اضافه وزن',
            color: '#fdcb6e',
            gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)',
            recommendations: [
                'کالری دریافتی خود را کاهش دهید',
                'تمرینات هوازی را افزایش دهید',
                'از غذاهای سالم استفاده کنید',
                'با مربی ورزشی مشورت کنید'
            ]
        },
        obese1: {
            min: 30,
            max: 34.9,
            label: 'چاقی درجه ۱',
            color: '#e84393',
            gradient: 'linear-gradient(135deg, #e84393, #d63031)',
            recommendations: [
                'حتماً با پزشک مشورت کنید',
                'برنامه کاهش وزن تحت نظر متخصص',
                'تمرینات ورزشی منظم',
                'تغییر سبک زندگی ضروری است'
            ]
        },
        obese2: {
            min: 35,
            max: 39.9,
            label: 'چاقی درجه ۲',
            color: '#e84393',
            gradient: 'linear-gradient(135deg, #e84393, #d63031)',
            recommendations: [
                'مراجعه فوری به پزشک',
                'برنامه درمانی جامع',
                'نظارت مداوم بر سلامتی',
                'تغییرات اساسی در سبک زندگی'
            ]
        },
        obese3: {
            min: 40,
            max: 999,
            label: 'چاقی درجه ۳',
            color: '#e84393',
            gradient: 'linear-gradient(135deg, #e84393, #d63031)',
            recommendations: [
                'مراجعه فوری به پزشک متخصص',
                'برنامه درمانی فشرده',
                'نظارت مداوم پزشکی',
                'ممکن است نیاز به جراحی باشد'
            ]
        }
    };

    // Calculate BMI
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            showError('لطفاً مقادیر معتبر وارد کنید');
            return null;
        }

        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
        return parseFloat(bmi);
    }

    // Get BMI Category
    function getBMICategory(bmi) {
        for (const [key, category] of Object.entries(bmiCategories)) {
            if (bmi >= category.min && bmi < category.max) {
                return { key, ...category };
            }
        }
        return bmiCategories.obese3; // Default for very high BMI
    }

    // Update Chart Indicator
    function updateChartIndicator(bmi) {
        const category = getBMICategory(bmi);
        const percentage = ((bmi - category.min) / (category.max - category.min)) * 100;
        
        // Calculate position based on BMI value
        let position = 0;
        if (bmi < 18.5) {
            position = (bmi / 18.5) * 25; // First quarter
        } else if (bmi < 25) {
            position = 25 + ((bmi - 18.5) / 6.5) * 25; // Second quarter
        } else if (bmi < 30) {
            position = 50 + ((bmi - 25) / 5) * 25; // Third quarter
        } else {
            position = 75 + Math.min(((bmi - 30) / 10) * 25, 25); // Fourth quarter
        }
        
        chartIndicator.style.left = `${position}%`;
        chartIndicator.classList.add('show');
    }

    // Show Results
    function showResults(bmi) {
        const category = getBMICategory(bmi);
        
        // Update BMI number
        bmiNumber.textContent = bmi;
        
        // Update status
        bmiStatus.innerHTML = `<span class="status-text" style="background: ${category.gradient}; color: white;">${category.label}</span>`;
        
        // Update chart indicator
        updateChartIndicator(bmi);
        
        // Update recommendations
        updateRecommendations(category);
        
        // Show results section
        resultsSection.classList.add('show');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update Recommendations
    function updateRecommendations(category) {
        const recommendationContent = recommendations.querySelector('.recommendation-content');
        recommendationContent.innerHTML = `
            <div class="recommendation-list">
                ${category.recommendations.map(rec => `
                    <div class="recommendation-item">
                        <span class="recommendation-icon">💡</span>
                        <span class="recommendation-text">${rec}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Show Error
    function showError(message) {
        bmiNumber.textContent = '--';
        bmiStatus.innerHTML = `<span class="status-text" style="background: #ff4757; color: white;">خطا</span>`;
        
        const recommendationContent = recommendations.querySelector('.recommendation-content');
        recommendationContent.innerHTML = `<p style="color: #ff4757;">${message}</p>`;
        
        resultsSection.classList.add('show');
        chartIndicator.classList.remove('show');
    }

    // Validate Inputs
    function validateInputs() {
        const age = parseInt(ageInput.value);
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (age < 15 || age > 70) {
            showError('سن باید بین 15 تا 70 سال باشد');
            return false;
        }

        if (height < 50 || height > 200) {
            showError('قد باید بین 50 تا 200 سانتی‌متر باشد');
            return false;
        }

        if (weight < 1 || weight > 250) {
            showError('وزن باید بین 1 تا 250 کیلوگرم باشد');
            return false;
        }

        return true;
    }

    // Calculate Button Click
    calculateBtn.addEventListener('click', function() {
        if (!validateInputs()) return;
        
        const bmi = calculateBMI();
        if (bmi !== null) {
            showResults(bmi);
        }
    });

    // Enter Key Press
    [ageInput, heightInput, weightInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (!validateInputs()) return;
                
                const bmi = calculateBMI();
                if (bmi !== null) {
                    showResults(bmi);
                }
            }
        });
    });

    // Real-time Validation
    [ageInput, heightInput, weightInput].forEach(input => {
        input.addEventListener('input', function() {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            
            if (value < min || value > max) {
                this.style.borderColor = '#ff4757';
            } else {
                this.style.borderColor = 'rgba(255, 107, 53, 0.2)';
            }
        });
    });

    // Add CSS for recommendation items
    const style = document.createElement('style');
    style.textContent = `
        .recommendation-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .recommendation-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius);
            border: 1px solid rgba(255, 107, 53, 0.2);
            transition: var(--transition);
        }
        
        .recommendation-item:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateX(-5px);
        }
        
        .recommendation-icon {
            font-size: 1.2rem;
            color: var(--primary-color);
        }
        
        .recommendation-text {
            color: var(--text-light);
            font-size: 1rem;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .recommendation-item {
                padding: 0.8rem;
                gap: 0.8rem;
            }
            
            .recommendation-text {
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
});
