<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Réinitialisation du mot de passe - Carrent</title>
    <!-- Importation des polices Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            background-color: #f9f9f9;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        
        .header {
            background-color: #1F4068;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        
        .header img {
            max-height: 60px;
        }
        
        .header h1 {
            color: white;
            margin: 10px 0 0 0;
            font-size: 24px;
            font-weight: 600;
        }
        
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #444;
        }
        
        .content h2 {
            color: #2C5A96;
            margin-top: 0;
        }
        
        .button {
            display: inline-block;
            background-color: #6083B7;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            margin: 20px 0;
            border-radius: 4px;
            font-weight: 500;
            font-family: 'Quicksand', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .footer {
            background-color: #f5f5f5;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #777;
            border-radius: 0 0 5px 5px;
            border-top: 2px solid #6083B7;
        }
        
        .footer a {
            color: #2C5A96;
            text-decoration: none;
        }
        
        .info {
            background-color: #f9f9f9;
            border-left: 4px solid #2C5A96;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ $message->embed(public_path('images/carrent-logo.png')) }}" alt="Carrent Logo">
            <h1>Carrent - Location de véhicules</h1>
        </div>
        
        <div class="content">
            <h2>Réinitialisation de votre mot de passe</h2>
            
            <p>Bonjour {{ $user->name ?? '' }},</p>
            
            <p>Vous recevez cet email car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.</p>
            
            <div style="text-align: center;">
                <a href="{{ $url }}" class="button">Réinitialiser mon mot de passe</a>
            </div>
            
            <p>Ce lien de réinitialisation de mot de passe expirerax dans 60 minutes.</p>
            
            <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise.</p>
            
            <div class="info">
                <p>Si vous rencontrez des problèmes avec le bouton ci-dessus, copiez et collez l'URL suivante dans votre navigateur web: {{ $url }}</p>
            </div>
            
            <p>Cordialement,<br>L'équipe Carrent</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Carrent. Tous droits réservés.</p>
            <p>
                <a href="{{ url('/terms') }}">Conditions d'utilisation</a> |
                <a href="{{ url('/privacy') }}">Politique de confidentialité</a>
            </p>
        </div>
    </div>
</body>
</html>