function toggleMenu() {
	if (document.querySelector('.hamburger').classList.contains('opened')) {
		document.querySelector('.hamburger').classList.remove('opened');
		Array.from(document.querySelectorAll('.menu-visible')).forEach(element => element.classList.remove('menu-visible'));
	} else {
		document.documentElement.style.setProperty('--window-diagonal-size', (Math.floor(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) + 100) + 'px');
		document.querySelector('.hamburger').classList.add('opened');
		document.querySelector('.menu').classList.add('menu-visible');
	}
}
function notify2(message = '', seconds) {
	var notification = document.createElement('div');
	notification.classList = 'notification padding';
	var notificationMessage = document.createElement('h4');
	notificationMessage.innerHTML = message;
	notification.appendChild(notificationMessage);
	var close = document.createElement('h3');
	close.innerHTML = 'X';
	close.onclick = closeNotification;
	notification.appendChild(close);
	document.querySelector('.notification-container').appendChild(notification);
	if (seconds) {
		setTimeout(function(){close.click();}, seconds * 1000)
	}
}
function closeNotification2(event) {
	var target = event.target.closest('.notification');
	target.classList.add('hidden');
	setTimeout(function(){target.remove();}, 500);
}
window.onload = function() {
	Array.from(document.querySelectorAll('input')).forEach(element => {
		element.autocomplete = 'off';
	});
}

function notify(message = '', seconds) {
    // First check if notification container exists, if not create it
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        
        // Add the CSS for the container if not already present
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .notification {
                background: white;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-bottom: 10px;
                padding: 15px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-width: 200px;
            }
            
            .notification h4 {
                margin: 0;
                padding-right: 20px;
				color: #000000;
            }
            
            .notification h3 {
                cursor: pointer;
                margin: 0;
                color: #666;
				color: #000000;
            }
            
            .notification h3:hover {
                color: #000000;
            }
        `;
        document.head.appendChild(style);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification padding';
    
    // Add message
    const notificationMessage = document.createElement('h4');
    notificationMessage.innerHTML = message;
    notification.appendChild(notificationMessage);
    
    // Add close button
    const close = document.createElement('h3');
    close.innerHTML = 'X';
    close.onclick = closeNotification;
    notification.appendChild(close);
    
    // Add to container
    container.appendChild(notification);
    
    // Auto close if seconds specified
    if (seconds) {
        setTimeout(() => {
            try {
                close.click();
            } catch (e) {
                console.warn('Could not auto-close notification:', e);
            }
        }, seconds * 1000);
    }

    // Close notification function
    function closeNotification() {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            try {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            } catch (e) {
                console.warn('Error removing notification:', e);
            }
        }, 300);
    }
}

// Drop to upload
const droppables = document.querySelectorAll('.drop-area');
Array.from(droppables).forEach(element => {
	element.addEventListener('dragenter', dropEnter, false);
	element.addEventListener('dragleave', dropLeave, false);
	element.addEventListener('dragover', dropOver, false);
	element.addEventListener('drop', dropDrop, false);
	element.children[1].addEventListener('click', function() {
		this.value = null;
	}, false);
})
function dropEnter(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.add('hover');
}
function dropLeave(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.remove('hover');
}
function dropOver(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.add('hover');
}
function dropDrop(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.remove('hover');
	destination = window[e.target.closest('.drop-area')?.querySelector("input").getAttribute('data-dropFunction')];
	otherParams = e.target.closest('.drop-area')?.querySelector("input").getAttribute('data-otherParams');
	uploadFiles(e.dataTransfer.files, destination, otherParams);
}
async function uploadFiles(filesRaw, destination, otherParams = '') {
	var files = ([...filesRaw]);
	if (files.length > 9) {
		if (!confirm('You are uploading ' + files.length + ' images. Would you like to continue?')) {
			return;
		}
	}
	files.forEach(file => {
		var reader = new FileReader();
		reader.onloadend = function () {
			console.log(otherParams);
			if (otherParams != null){
				if (otherParams.includes('filename')) {
					otherParams = 'filename=' + file.name;
				}
			}
			destination(reader.result, otherParams);
		}
		reader.onerror = function () {
			destination('/img/blank.png', otherParams);
		}
		reader.readAsDataURL(file);
	})
}

//Collapsible elements
function toggleCollapse(event) {
	event.target.closest('.collapsible').classList.toggle('collapsed');
}

//Input same value still enters
const urlInputs = Array.from(document.querySelectorAll('input[type=url]'));
urlInputs.forEach(element => {
	element.addEventListener('keyup', function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			element.dispatchEvent(new Event('change'));
		}
	});
});

//bind two inputs to match values
function bindInputs(query1, query2, checkbox = false) {
	var e1 = document.querySelector(query1);
	var e2 = document.querySelector(query2);
	if (checkbox) {
		e1.oninput = (event) => {e2.checked = e1.checked;}
		e2.oninput = (event) => {e1.checked = e2.checked;}
	} else {
		e1.oninput = (event) => {e2.value = e1.value;}
		e2.oninput = (event) => {e1.value = e2.value;}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	document.body.dispatchEvent(new Event('doCreate'));
})

document.onkeyup = function(e) {
	if (document.activeElement === document.getElementById('text-editor')) {
		if (e.ctrlKey && e.which == 73) {
			toggleTextTag('i');

			e.preventDefault();
		}
	}
}