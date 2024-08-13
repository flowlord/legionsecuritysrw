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
          <p style="color:white;">Les avis sont <span style="text-decoration: underline;">extrêmement</span> négatifs</p>
          <button id="safe-button">Revenir en lieu sûr</button>
          <button id="trustpilot-button">Lire les avis</button>
        </div>
      `;
      document.body.appendChild(overlay);
  
      // Ajout des styles
      const style = document.createElement('style');
      style.textContent = `
        #fraud-warning-overlay {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(4.9px);
          -webkit-backdrop-filter: blur(4.9px);
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
  