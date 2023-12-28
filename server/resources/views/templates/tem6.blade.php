<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        }
        body {
        background: #585c68;
        font-size: 14px;
        line-height: 22px;
        color: #555555;
        }
        
        .bold {
        font-weight: 700;
        font-size: 20px;
        text-transform: uppercase;
        
        }

        .bolde {
            position: absolute;
            top: 230px;
            left: 10px;
        font-weight: 700;
        font-size: 20px;
        text-transform: uppercase;
        text-align: center;
        color: #ffffff;
        }

        
        .semi-bold {
        font-weight: 500;
        font-size: 16px;
        }
        .resume
        {
            background-color: white;
            height: auto;
            width: 650px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 41%;
            top: 0%;
        }
        
        .resume .resume_left {
            width: 220px;
            height: 100%;
            float: left;
        background: #17181c;
        }
        
        .resume .resume_left .resume_profile {
        width: 100%;
        height: 280px;
        }
        
        .resume .resume_left .resume_profile img {
            width: 100%;
            height: 100%;
            border: 6px solid #ffffff;
            padding-right: 2px;
        }
        
        .resume .resume_left .resume_content {
        padding: 0 25px;
        }
        
        .resume .title {
        margin-bottom: 10px;
        }
        
        .resume .resume_left .bold {
        color: #fff;
        }
        
        .resume .resume_left .regular {
        color: #ffffff;
        text-align: center;
        position: absolute;
            top: 250px;
            left: 10px;    }
        
        .resume .resume_item {
        padding: 25px 0;
        border-bottom: 2px solid #ffffff;
        margin-top: 0px;
        }
        
        
        
        
        .resume .resume_left ul li {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        }
        
        .resume .resume_left ul li:last-child {
        margin-bottom: 0;
        }
        
        .resume .resume_left ul li .icon {
        width: 35px;
        height: 35px;
        background: #fff;
        color: #000000;
        border-radius: 50%;
        margin-right: 15px;
        font-size: 16px;
        position: relative;
        }
        
        
        
        .resume .resume_left ul li .data {
        color: #000000;
        }
        
        .resume .resume_left .resume_skills ul li {
        display: flex;
        margin-bottom: 10px;
        color: #ffffff;
        justify-content: space-between;
        align-items: center;
        }
        
        .resume .resume_left .resume_skills ul li .skill_name {
        width: 25%;
        }
        
        .resume .resume_left .resume_skills ul li .skill_progress {
        width: 60%;
        margin: 0 5px;
        height: 5px;
        background: #ffffff;
        position: relative;
        }
        
        .resume .resume_left .resume_skills ul li .skill_per {
        width: 15%;
        }
        
        .resume .resume_left .resume_skills ul li .skill_progress span {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #fff;
        }
        
        .resume .resume_left .resume_social .semi-bold {
        color: #fff;
        margin-bottom: 3px;
        }
        
        .resume .resume_right {
        background: #fff;
        padding: 25px;
        width: 550px;
        float: left;
        height: 1100px;
        }
        
        
        
        .img
        {
            margin: 6px;
        }
        .img2
        {
            margin: 1.5px;
        }
        
        .imga
        {
            width: 30px;
            font-size: 18px;
            color: #e37b7d;
        }
        .imgaa
        {
            width: 0px;
            color: #fbfbfb;
            font-size: 15px;
            position: absolute;
        }

        .header{
            padding: 50px;
            width: 78%;
            background-color: #17181c;
            color: white;
                }
    </style>
</head>
<body>
	
    <div class="resume">
        <div class="resume_left">
            <div class="resume_profile">
            <img src="{{$informations->picture}}" alt="profile_pic">
            </div>
            <div class="resume_content">
            
                <div class="resume_item resume_skills">
                    <div class="title">
                    <p class="bold">skill's</p>
                    </div>
                    <ul>
                        @foreach ($skills["skills"] as $skill)
                        <li>
                            <div class="skill_name">
                                {{$skill}}
                            </div>
                        </li>
                        @endforeach
                    </ul>
                </div>
                <div class="resume_item resume_skills">
                    <div class="title">
                        
                    <p class="bold">LANGUAGES</p>
                    </div>
                    <ul>
                    @foreach ($skills["languages"] as $lang => $score)
                    <li>
                        <div class="skill_name">
                            {{$lang}}:{{$score}}
                        </div>
                    </li>
                    @endforeach
                    </ul>
                </div>
                <div class="resume_item resume_skills">
                    <div class="title">
                    <p class="bold">hobbie</p>
                    </div>
                    <ul>
                        @foreach ($skills["hobbies"] as $hobbie)
                        <li>
                            <div class="skill_name">
                                {{$hobbie}}
                            </div>
                        </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="resume_right">
            <div class="header">
                <h1>{{$informations->first_name}} <span class="text-blue text-uppercase">{{$informations->last_name}}</span></h1>
                <p>{{$informations->proffesion}}</p>
                <ul class="infos">
                <li><i class="icon fas fa-map-marker-alt text-blue"></i> {{$user->email}}</li>
                <li><i class="icon fas fa-phone text-blue"></i> {{$informations->phone}}</li>
                <li><i class="icon fas fa-map-marker-alt text-blue"></i> {{$informations->address}}</li>
                <li><i class="icon fas fa-map-marker-alt text-blue"></i> {{$informations->linkedin_url}}</li>
                <li><i class="icon fas fa-map-marker-alt text-blue"></i> {{$informations->website_url}}</li>
                </ul>
            </div>
            
            <div class="resume_item resume_work">
                <div class="title">
                <p class="bold">Education</p>
                </div>
                <ul>
                    @foreach ($educations as $education)
                    <li>
                        <div class="date">{{$education->start_date}} / {{$education->end_date}}</div> 
                        <div class="info">
                            <p class="semi-bold">{{$education->degree}} ({{$education->school}})</p> 
                        <p>{{$education->description}}</p>
                        </div>
                    </li>
                    @endforeach
                </ul>
            </div>
            <div class="resume_item resume_education">
            <div class="title">
                <p class="bold">Experience</p>
                </div>
                <ul>
                    @foreach ($experiences as $experience)
                    <li>
                        <div class="date">{{$experience->start_date}} / {{$experience->end_date}}</div> 
                        <div class="info">
                            <p class="semi-bold">{{$experience->title}}
                                ({{$experience->company_name}}) : ({{$experience->employement_type}}) | {{$experience->location}}
                            </p> 
                        <p>{{$experience->description}}</p>
                        </div>
                    </li>
                    @endforeach
                </ul>
            </div>
            
            </ul>
            </div>
        </div>
        </div>
</body>
</html>