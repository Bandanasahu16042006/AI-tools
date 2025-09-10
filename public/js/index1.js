function scrollToBottom() {
    var conversation = document.getElementById("conversation");
    conversation.scrollTop = conversation.scrollHeight;
}




 async function submitQuestion() {
    var question = document.getElementById("question").value;
    var messageElement = document.getElementById("message");
    var greetingElement = document.getElementById("greeting");
    var conversationElement = document.getElementById("conversation");



    if (question.trim() !== "") {
        // Hide "Hello," on the first submission
        greetingElement.style.display = "none";

        // Create a new container for the question and answer
        var qaContainer = document.createElement("div");
        qaContainer.style.marginTop = "20px";

        // Create and append the user's question
        var userQuestion = document.createElement("p");
        userQuestion.textContent = "You asked: " + question;
        userQuestion.style.textAlign = "left";
        qaContainer.appendChild(userQuestion);
        var responseEle = document.createElement("p");
        const array = question.trim().split(/\s+/);
        if (array.length > 3)
        {
        question="For the below question answer in the format like \nwhich ai can be used for image generation?\n1. Midjourney\n2. Stable Diffusion\n3. DALL-E 2"+question;
        }
        try {
            const response = await fetch('/ask-gemini', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: question })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const answer = data.answer;
            // Sanitize the answer
            // answer = answer.replace(/\*/g, '<br>'); // Remove all asterisks
            responseEle.textContent =answer; 

    
            //var response = document.createElement("p");
            //response.textContent = "This is an example answer.";
            responseEle.style.textAlign = "left";
            responseEle.style.backgroundColor = "#f1f1f1";
            responseEle.style.padding = "10px";
            responseEle.style.borderRadius = "5px";
            qaContainer.appendChild(responseEle);

            // Append the new Q&A container to the conversation area
            conversationElement.appendChild(qaContainer);

            // Clear the textarea
            document.getElementById("question").value = "";
            document.getElementById("question").style.height = "50px";

            // Hide the message if the input is valid
            messageElement.textContent = "";
            scrollToBottom();
          }
        
         catch (error) {
            console.error('Error fetching answer:', error);
            responseEle.textContent = 'An error occurred while processing your request.';
        }
    


    } else {
        // Display a message if the user submits an empty input
        messageElement.textContent = "Please enter a question to proceed.";
        messageElement.style.color = "red";
    }
}
function loadContent(contentId) {
    let content = {
        'rtopleft': `<h3><a href="https://unsummary.com/">Unsummary</a></h3><p>Unsummary is an AI-powered tool that helps students and professionals generate concise summaries of lengthy documents, making information more digestible.</p><p><strong>Features:</strong></p><ul><li>Generates summaries for articles, research papers, and other lengthy texts.</li><li>Helps users quickly grasp the key points of complex materials.</li></ul><p><strong>Best For:</strong> Students and professionals who want to streamline their study or research processes by condensing large amounts of information into bite-sized summaries.</p>`,
        'rtopmiddle': `<h3><a href="https://diffusionart.co/">DiffusionArt</a></h3><p>DiffusionArt is a platform for generating AI-based artwork using diffusion models. It allows users to create unique digital art pieces with just a few clicks.</p><p><strong>Features:</strong></p><ul><li>Uses advanced AI models to generate high-quality digital art.</li><li>Offers various customization options to tweak the output.</li><li>Suitable for both artists and non-artists interested in creating digital art.</li></ul><p><strong>Best For:</strong> Individuals interested in exploring AI-generated art without needing extensive artistic skills.</p>`,
        'rtopright': `<h3><a href="https://www.imagine.art/">Imagine.Art</a></h3><p>Imagine.Art is a generative art platform that allows users to generate and customize AI art. It focuses on enabling creative expression through AI.</p><p><strong>Features:</strong></p><ul><li>Offers a wide range of styles and themes for generating artwork.</li><li>Provides tools for modifying and refining AI-generated art.</li><li>Emphasizes ease of use, making it accessible to a broad audience.</li></ul><p><strong>Best For:</strong> Artists and hobbyists looking to experiment with AI-generated visuals.</p>`,
        'rbottomleft': `<h3><a href="https://mixart.ai/?utm_source=easywithaicom&utm_medium=catalog&utm_campaign=easywithai">MixArt</a></h3><p>MixArt.ai is an AI-powered art creation tool that combines various artistic styles and techniques to generate unique digital artworks.</p><p><strong>Features:</strong></p><ul><li>Allows blending of different artistic styles to create new and original pieces.</li><li>Offers customization options to fine-tune the generated artwork.</li><li>Supports collaboration between AI and human creativity.</li></ul><p><strong>Best For:</strong> Creative professionals and enthusiasts interested in blending multiple artistic influences through AI.</p>`,
        'rbottommiddle': `<h3><a href="https://www.tutorai.me/">TutorAI</a></h3><p>TutorAI is an AI-driven platform that provides personalized learning experiences by adapting to the learner's needs. It offers tutoring across various subjects.</p><p><strong>Features:</strong></p><ul><li>Provides interactive lessons and explanations tailored to the user's learning pace.</li><li>Covers a wide range of subjects, making it a versatile tool for students of all ages.</li><li>Offers instant feedback and guidance, simulating a one-on-one tutoring experience.</li></ul><p><strong>Best For:</strong> Students who need additional support in specific subjects and prefer personalized learning paths.</p>`,
        'rbottomright': `<h3><a href="https://www.phind.com/">Phind</a></h3><p>Phind is an AI search engine designed for technical and educational purposes. It provides accurate answers to complex questions by searching through technical documents and educational resources.</p><p><strong>Features:</strong></p><ul><li>Focuses on delivering precise answers to queries related to programming, technology, and education.</li><li>Saves time by filtering out irrelevant results and presenting the most accurate information first.</li></ul><p><strong>Best For:</strong> Programmers, students, and educators looking for reliable technical and educational resources.</p>`
    };

    // Show the popup with the dynamic content
    document.getElementById('popup-text').innerHTML = content[contentId];
    document.getElementById('popup').style.display = 'flex';

    // Disable hover effect after click by removing the transition
    document.getElementById(contentId).style.transition = 'none';

    // Update URL without reloading the page
    history.pushState({ content: contentId }, '', `?content=${contentId}`);
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}


// window.onpopstate = function(event) {
//     if (event.state && event.state.content) {
//         let content = {
//         'rtopleft': `<h3>Unsummary</h3><p>Unsummary is an AI-powered tool that helps students and professionals generate concise summaries of lengthy documents, making information more digestible.</p><p><strong>Features:</strong></p><ul><li>Generates summaries for articles, research papers, and other lengthy texts.</li><li>Helps users quickly grasp the key points of complex materials.</li></ul><p><strong>Best For:</strong> Students and professionals who want to streamline their study or research processes by condensing large amounts of information into bite-sized summaries.</p>`,
//         'rtopmiddle': `<h3>DiffusionArt</h3><p>DiffusionArt is a platform for generating AI-based artwork using diffusion models. It allows users to create unique digital art pieces with just a few clicks.</p><p><strong>Features:</strong></p><ul><li>Uses advanced AI models to generate high-quality digital art.</li><li>Offers various customization options to tweak the output.</li><li>Suitable for both artists and non-artists interested in creating digital art.</li></ul><p><strong>Best For:</strong> Individuals interested in exploring AI-generated art without needing extensive artistic skills.</p>`,
//         'rtopright': `<h3>Imagine.Art</h3><p>Imagine.Art is a generative art platform that allows users to generate and customize AI art. It focuses on enabling creative expression through AI.</p><p><strong>Features:</strong></p><ul><li>Offers a wide range of styles and themes for generating artwork.</li><li>Provides tools for modifying and refining AI-generated art.</li><li>Emphasizes ease of use, making it accessible to a broad audience.</li></ul><p><strong>Best For:</strong> Artists and hobbyists looking to experiment with AI-generated visuals.</p>`,
//         'rbottomleft': `<h3>MixArt</h3><p>MixArt.ai is an AI-powered art creation tool that combines various artistic styles and techniques to generate unique digital artworks.</p><p><strong>Features:</strong></p><ul><li>Allows blending of different artistic styles to create new and original pieces.</li><li>Offers customization options to fine-tune the generated artwork.</li><li>Supports collaboration between AI and human creativity.</li></ul><p><strong>Best For:</strong> Creative professionals and enthusiasts interested in blending multiple artistic influences through AI.</p>`,
//         'rbottommiddle': `<h3>TutorAI</h3><p>TutorAI is an AI-driven platform that provides personalized learning experiences by adapting to the learner's needs. It offers tutoring across various subjects.</p><p><strong>Features:</strong></p><ul><li>Provides interactive lessons and explanations tailored to the user's learning pace.</li><li>Covers a wide range of subjects, making it a versatile tool for students of all ages.</li><li>Offers instant feedback and guidance, simulating a one-on-one tutoring experience.</li></ul><p><strong>Best For:</strong> Students who need additional support in specific subjects and prefer personalized learning paths.</p>`,
//         'rbottomright': `<h3>Phind</h3><p>Phind is an AI search engine designed for technical and educational purposes. It provides accurate answers to complex questions by searching through technical documents and educational resources.</p><p><strong>Features:</strong></p><ul><li>Focuses on delivering precise answers to queries related to programming, technology, and education.</li><li>Saves time by filtering out irrelevant results and presenting the most accurate information first.</li></ul><p><strong>Best For:</strong> Programmers, students, and educators looking for reliable technical and educational resources.</p>`    
//         };
//         document.getElementById('dynamic-content').innerHTML = content[event.state.content];
//         document.getElementById('dynamic-content').style.display = 'block';

//         // Ensure the height of the #right element is increased by 30% on back navigation
//         document.getElementById('right').style.height = "150%";
//     } else {
//         document.getElementById('dynamic-content').innerHTML = '';
//         document.getElementById('dynamic-content').style.display = 'none';
//         document.getElementById('right').style.height = "120%";
//     }
// };

// window.onload = function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const contentId = urlParams.get('content');
//     if (contentId) {
//         loadContent(contentId);
//     } else {
//         document.getElementById('dynamic-content').style.display = 'none';
//         document.getElementById('right').style.height = "120%";
//     }
// };
