<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF DEFAULT</title>
    
    <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }
            .cv-header{
                background-color: #7443d5;
            }
            table{
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }
            .picture{
                margin: 20px 0px 20px 30px;
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 6px solid #fff;
            }
            .full-name{
                width: 80%;
                font-size: 45px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 20px;
                border-bottom: 5px solid #fff;
                margin-left: 20px;
            }
            .proffesion{
                width: 90%;
                font-size: 25px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 10px;
                margin-left: 20px;
            }
            .sidebar{
                background-color: #eee;
                padding-top: 20px;
                padding-bottom: 20px;
            }
            .sidebar-container{
                padding: 30px;
                padding-left: 0;
                font-weight: bold;
            }
            .sidebar-container h4{
                padding-left: 20px;
                padding-bottom: 15px;
            }
            .sidebar-container p{
                margin-bottom: 10px;
                color: #7443d5;
                font-size: 14px;
                padding-left: 30px;
            }
            .biography{
                padding: 30px;
                padding-top: 0px;
                text-align: justify;
                font-size: 18px;
            }
            .skills, .hobbies, .languages{
                padding: 30px;
                padding-top: 0;
            }
            .skills-item, .hobbies-item, .language-item{
                padding: 3px 5px;
                background-color: #7443d5;
                color: #fff;
                font-size: 13px;
                border-radius: 5px;
                display: block;
                margin-right: 5px;
                margin-bottom: 5px;
                text-align: center;
            }
            .language-item{
                background-color: #fff;
                color: #7443d5;
            }
            .content-section{
                padding: 30px;
            }
            .content-section h4{
                padding-left: 20px;
                padding-bottom: 15px;
            }
            .education, .experience{
                padding: 10px;
                background-color: #eee;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .education-header{
                margin-bottom: 10px;
            }
            .education-degree, .experience-title{
                font-size: 18px;
                font-weight: bold;
                color: #7443d5;
            }
            .education-school{
                margin-left: 10px;
                font-size: 18px;
                font-weight: bold;
            }
            .education-description, .experience-description{
                text-align: justify;
                margin-bottom: 10px;
            }
            .education-date{
                font-weight: bold;
                color: #7443d5;
            }
            .experience{
                background-color: #fff;
                border: 2px solid #7443d5;
            }
            .company-info{
                margin-bottom:5px; 
            }
            .company-name{
                font-weight: bold;
                margin-right: 5px;
            }
            .employment_type{
                color: #7b7a7a;
            }
            .experience-location{
                text-transform: uppercase;
                color: #7d4be2d6;
                margin-bottom: 5px;
            }
            .experience-date{
                background-color: #986fe9;
                color: #fff;
                padding: 3px;
                font-size: 13px;
                border-radius: 6px;
            }
    </style>
</head>

    
<body>
    <table>
        <tr class="cv-header">
            <td colspan="1">
                <div class="hero-image">
                    <img class="picture" src="{{$informations->picture}}" alt="user-picture" id="picture">
                </div>
            </td>
            <td colspan="3">
                <div class="hero-text">
                    <h1 class="full-name">
                        <span id="first_name">{{$informations->first_name}}</span>
                        <span id="last_name">{{$informations->last_name}}</span>
                    </h1>
                    <h3 class="proffesion">{{$informations->proffesion}}</h3>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="sidebar">
                <div class="sidebar-container">
                    <h4>Contact Info</h4>
                    <p id="email">{{$user->email}}</p>
                    <p id="phone">{{$informations->phone}}</p>
                    <p id="address">{{$informations->address}}</p>
                    <p id="linkedin_url">{{$informations->linkedin_url}}</p>
                    <p id="website_url">{{$informations->website_url}}</p>
                </div>
                <div class="sidebar-container">
                    <h4>Skills</h4>
                    <div class="skills">
                        @foreach ($skills["skills"] as $skill)
                        <span class="skills-item">{{$skill}}</span>
                        @endforeach
                    </div>
                </div>
                <div class="sidebar-container">
                    <h4>Hobbies</h4>
                    <div class="hobbies">
                        @foreach ($skills["hobbies"] as $hobbie)
                        <span class="hobbies-item">{{$hobbie}}</span>
                        @endforeach
                    </div>
                </div>
                <div class="sidebar-container">
                    <h4>Languages</h4>
                    <div class="languages" id="languages">
                        @foreach ($skills["languages"] as $lang => $score)
                        <span class="language-item">{{$lang}} : {{$score}}</span>
                        @endforeach
                    </div>
                </div>
            </td>
            <td colspan="2" class="content-section">
                <h4>Biography</h4>
                <p class="biography">{{$informations->biography}}</p>
                <h4>Educations</h4>
                @foreach ($educations as $education)
                <div class="education">
                    <div class="education-header">
                        <span class="education-degree">{{$education->degree}} |</span>
                        <span class="education-school">{{$education->school}}</span>
                    </div>
                    <p class="education-description">{{$education->description}}</p>
                    <span class="education-date">{{$education->start_date}} / {{$education->end_date}}</span>
                </div>
                @endforeach
                <h4>Experiences</h4>
                @foreach ($experiences as $experience)
                <div class="experience">
                    <h5 class="experience-title">{{$experience->title}}</h5>
                    <div class="company-info">
                        <span class="company-name">{{$experience->company_name}}</span>
                        <span class="employment_type">({{$experience->employement_type}})</span>
                    </div>
                    <span class="experience-location">{{$experience->location}} - {{$experience->location_type}}</span>
                    <p class="experience-description">{{$experience->description}}</p>
                    <div>
                        <span class="experience-date">{{$experience->start_date}}</span>
                        TO
                        <span class="experience-date">{{$experience->end_date}}</span>
                    </div>
                </div>
                @endforeach
            </td>
        </tr>
    </table>
</body>
