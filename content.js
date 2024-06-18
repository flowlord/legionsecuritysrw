(function() {
    // Fonction pour comparer les URL
    function compareUrls(currentUrl, links) {
      return links.some(link => link.site_url === currentUrl);
    }
  
    // Récupération de l'URL actuelle du navigateur
    const currentUrlFromPage = window.location.href;
  
    // Envoi d'un message au script de fond pour récupérer les données JSON
    chrome.runtime.sendMessage({ action: 'fetchData' }, (data) => {
      if (compareUrls(currentUrlFromPage, data)) {
        showWarningPopup(currentUrlFromPage);
      }
    });
  
    // Fonction pour afficher le popup d'avertissement
    function showWarningPopup(currentUrl) {
      // Création de l'overlay
      const overlay = document.createElement('div');
      overlay.id = 'fraud-warning-overlay';
      overlay.innerHTML = `
        <div id="fraud-warning-popup">
          <p style="color:white;">Attention, ce site est potentiellement frauduleux !</p>
          <p style="color:white;">Les avis sont <span style="text-decoration: underline;">extrêment</span> négative</p>
          <button id="safe-button">revenir en lieu sûr</button>
          <button id="trustpilot-button">lire les avis trustpilot</button>
        </div>
      `;
      document.body.appendChild(overlay);
  
      // Ajout des styles
      const style = document.createElement('style');
      style.textContent = `
        #fraud-warning-overlay {
          font-size: 25px;
          font-family: Arial;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          border-radius: 50px;
        }
        #fraud-warning-popup {
          background-color: #BC3838;
          padding: 35px;
          border-radius: 10px;
          text-align: center;
          color: white;
        }
        #fraud-warning-popup p {
          font-size: 20px;
          margin-bottom: 20px;
        }
        #fraud-warning-popup button {
          margin: 5px;
          padding: 10px 20px;
          font-size: 20px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        #safe-button {
          background: #000000;
          color: #ffffff;
        }
        #trustpilot-button {
          background: #000000;
          color: #04DA8D;
        }
      `;
      document.head.appendChild(style);
  
      // Ajout des actions des boutons
      document.getElementById('safe-button').addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
      });
  
      document.getElementById('trustpilot-button').addEventListener('click', () => {
        window.location.href = `https://fr.trustpilot.com/review/${new URL(currentUrl).hostname}`;
      });
    }
  })();
  