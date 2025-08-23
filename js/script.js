// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Add Ingredient Function
function addIngredient() {
    const ingredientsList = document.getElementById('ingredientsList');
    const newIngredient = document.createElement('div');
    newIngredient.className = 'ingredient-item';
    newIngredient.innerHTML = `
        <input type="text" name="ingredients[]" placeholder="e.g., 2 cups all-purpose flour" required>
        <button type="button" class="remove-ingredient" onclick="removeIngredient(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    ingredientsList.appendChild(newIngredient);
    
    // Add animation
    newIngredient.style.opacity = '0';
    newIngredient.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newIngredient.style.transition = 'all 0.3s ease';
        newIngredient.style.opacity = '1';
        newIngredient.style.transform = 'translateY(0)';
    }, 10);
}

// Remove Ingredient Function
function removeIngredient(button) {
    const ingredientItem = button.parentElement;
    ingredientItem.style.transition = 'all 0.3s ease';
    ingredientItem.style.opacity = '0';
    ingredientItem.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        ingredientItem.remove();
    }, 300);
}

// Add Instruction Function
function addInstruction() {
    const instructionsList = document.getElementById('instructionsList');
    const currentSteps = instructionsList.children.length;
    const newInstruction = document.createElement('div');
    newInstruction.className = 'instruction-item';
    newInstruction.innerHTML = `
        <div class="step-number">${currentSteps + 1}</div>
        <textarea name="instructions[]" placeholder="Describe this step in detail..." required></textarea>
        <button type="button" class="remove-instruction" onclick="removeInstruction(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    instructionsList.appendChild(newInstruction);
    
    // Add animation
    newInstruction.style.opacity = '0';
    newInstruction.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newInstruction.style.transition = 'all 0.3s ease';
        newInstruction.style.opacity = '1';
        newInstruction.style.transform = 'translateY(0)';
    }, 10);
    
    // Update step numbers
    updateStepNumbers();
}

// Remove Instruction Function
function removeInstruction(button) {
    const instructionItem = button.parentElement;
    instructionItem.style.transition = 'all 0.3s ease';
    instructionItem.style.opacity = '0';
    instructionItem.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        instructionItem.remove();
        updateStepNumbers();
    }, 300);
}

// Update Step Numbers Function
function updateStepNumbers() {
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach((step, index) => {
        step.textContent = index + 1;
    });
}

// Form Validation and Submission
document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff4757';
            field.style.boxShadow = '0 0 0 3px rgba(255, 71, 87, 0.1)';
        } else {
            field.style.borderColor = '#e0e0e0';
            field.style.boxShadow = 'none';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Collect form data
    const formData = new FormData(this);
    const recipeData = {
        title: formData.get('recipeTitle'),
        category: formData.get('recipeCategory'),
        prepTime: formData.get('prepTime'),
        cookTime: formData.get('cookTime'),
        servings: formData.get('servings'),
        difficulty: formData.get('difficulty'),
        ingredients: Array.from(formData.getAll('ingredients[]')).filter(ing => ing.trim()),
        instructions: Array.from(formData.getAll('instructions[]')).filter(inst => inst.trim()),
        description: formData.get('description'),
        imageUrl: formData.get('imageUrl'),
        tags: formData.get('tags')
    };
    
    // Simulate form submission (in real app, this would send to server)
    console.log('Recipe Data:', recipeData);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    this.reset();
    
    // Reset ingredients and instructions to initial state
    resetIngredientsAndInstructions();
});

// Reset Ingredients and Instructions to Initial State
function resetIngredientsAndInstructions() {
    // Reset ingredients
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = `
        <div class="ingredient-item">
            <input type="text" name="ingredients[]" placeholder="e.g., 2 cups all-purpose flour" required>
            <button type="button" class="remove-ingredient" onclick="removeIngredient(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Reset instructions
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = `
        <div class="instruction-item">
            <div class="step-number">1</div>
            <textarea name="instructions[]" placeholder="Describe this step in detail..." required></textarea>
            <button type="button" class="remove-instruction" onclick="removeInstruction(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

// Show Success Message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    // Add some animation
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.transform = 'scale(0.8)';
    successContent.style.opacity = '0';
    
    setTimeout(() => {
        successContent.style.transition = 'all 0.3s ease';
        successContent.style.transform = 'scale(1)';
        successContent.style.opacity = '1';
    }, 100);
}

// Hide Success Message
function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const successContent = successMessage.querySelector('.success-content');
    
    successContent.style.transition = 'all 0.3s ease';
    successContent.style.transform = 'scale(0.8)';
    successContent.style.opacity = '0';
    
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 300);
}

// Show Notification Function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : '#2ed573'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form Reset Function
document.querySelector('button[type="reset"]').addEventListener('click', function() {
    // Reset ingredients and instructions to initial state
    setTimeout(() => {
        resetIngredientsAndInstructions();
    }, 100);
});

// Input Focus Effects
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Auto-resize textareas
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'TEXTAREA') {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading state to submit button
document.getElementById('recipeForm').addEventListener('submit', function() {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Initialize tooltips for form fields
document.addEventListener('DOMContentLoaded', function() {
    // Add helpful tooltips to form fields
    const tooltipFields = [
        { id: 'recipeTitle', tooltip: 'Give your recipe a catchy, descriptive name' },
        { id: 'prepTime', tooltip: 'Time needed for chopping, measuring, etc.' },
        { id: 'cookTime', tooltip: 'Actual cooking/baking time' },
        { id: 'tags', tooltip: 'Help others find your recipe with relevant tags' }
    ];
    
    tooltipFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.title = field.tooltip;
        }
    });
});

// Add some fun animations when the page loads
window.addEventListener('load', function() {
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

