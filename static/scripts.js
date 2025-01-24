$(document).ready(function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    $('#chatToggle').click(function() {
        $('#chatContainer').toggle();
    });

    $('#closeChat').click(function() {
        $('#chatContainer').hide();
    });

    $('#sendBtn').click(function() {
        sendMessage();
    });

    $('#voiceBtn').click(function() {
        $('#userMessage').prop('disabled', true);
        $('#voiceBtn').addClass('listening');
        recognition.start();
    });

    recognition.onresult = function(event) {
        const userMessage = event.results[0][0].transcript;
        $('#userMessage').val(userMessage);
        sendMessage();
    };

    recognition.onend = function() {
        $('#userMessage').prop('disabled', false);
        $('#voiceBtn').removeClass('listening');
    };

    $('#userMessage').keypress(function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = $('#userMessage').val();
        if (userMessage.trim() !== '') {
            const timestamp = new Date().toLocaleTimeString();
            $('#chatBox').append(`
                <div class="user-message">
                    <div class="message-content">
                        ${userMessage}
                        <div class="timestamp">${timestamp}</div>
                    </div>
                    <img src="/static/user.png" alt="User" class="user-avatar">
                </div>
            `);
            $('#userMessage').val('');
            $.ajax({
                url: '/chat',
                type: 'POST',
                data: { message: userMessage },
                success: function(response) {
                    const botTimestamp = new Date().toLocaleTimeString();
                    $('#chatBox').append(`
                        <div class="bot-message">
                        <img src="/static/chatbot.png" alt="Bot" class="bot-avatar">
                            <div class="message-content">
                                ${response.response}
                                <div class="timestamp">${botTimestamp}</div>
                            </div>                            
                        </div>
                    `);
                    $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
                },
                error: function() {
                    $('#chatBox').append('<div class="bot-message">An error occurred</div>');
                }
            });
        }
    }
});
