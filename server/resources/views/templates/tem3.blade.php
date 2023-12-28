<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
			body{
				background-image: linear-gradient(#636162, #b1afaf);
				height: 122vh;
				font-weight: bold;
				letter-spacing: 2px;
			}
			*{
				margin: 0px; 
				padding: 0px; 
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			}
			.main{
				background-color: white;
				height: auto;
				width: 650px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 41%;
				top: 0%;
			}
			.left{
				background-color: #fbb03b;
				width: 200px;
				height: 100%;
				float: left;
			}
			.right{
				width: 580px;
				float: left;
			}
			.profile-img{
				height: 180px;
				width: 180px;
				background-color: #ddd;
				border-radius: 50%;
				margin-bottom: 20px;
				margin-left: 60px;
				border: 10px solid #fbb03b;
				box-shadow: 6px 7px 9px 5px #fbb03b73;
			}
			.profile-img img{
				width: 100%;
				border-radius: 50%;
			}
			.box-1{
				position: relative;
			}
			.heading{
				background-color: #4d4d4d;
				padding: 10px;
				color: #fbb03b;
				text-align: left;
				padding-left: 20px;
				margin-right: -15px;
			}
			.heading::after{
				content: '';
				position: absolute;
				width: 21px;
				height: 18px;
				background-color: #5a5959;
				left: 191px;
				top: 26px;
				transform:rotate(56deg);
				z-index: -1;
			}
			.p1{
				padding: 9px 10px;
				font-size: 11px;
			}
			.icons1{
				font-size: 16px!important;
				padding-right: 10px!important;
				vertical-align: sub;
			}
			.skill-container{
				width: 90%;
				background-color: #4d4d4d;
				margin: 0px 10px;
			}
			.skill{
				text-align: right;
				padding-top: 2px;
				padding-bottom: 2px;
				color: white;
			}
			.html{
				width: 90%;
				background-color: white;
			}
			.css{
				width: 80%;
				background-color: white;
			}
			.js{
				width: 85%;
				background-color: white;
			}
			.jquery{
				width: 80%;
				background-color: white;
			}
			.web {
				width: 85%;
				background-color: white;
			}
			.gra{
				width: 70%;
				background-color: white;
			}
			.icons2{
				padding: 18px 10px;
			}
			.name-div{
				padding: 86px 0px 60px 55px;
				text-align: center;
				letter-spacing: 3px;
			}
			.name-div h1{
				margin-bottom: 10px;
			}
			.box-2{
				padding-left: 50px;
				padding-right: 0px;
				padding-top: 0px;
				margin-top: 30px;
			}
			.p2{
				font-size: 15px;
				font-weight: 1;
				letter-spacing: 1px;
				word-spacing: 2px;
				line-height: 18px;
				margin-top: 5px;
			}
			h2{
				font-size: 16px;
				margin-bottom: 15px;
			}
			.icons3{
				vertical-align: bottom;
				font-size: 21px!important;
				color: #4d4d4d;
			}
			.p3{
				font-size: 13px;
				word-spacing: 1px;
				letter-spacing: 0px;
				margin-top: 10px;
				color:coral
			}
			.p4{
				font-size: 13px;
				word-spacing: 1px;
				letter-spacing: 0px;
				margin-top: 10px;
				color:darkgoldenrod
			}
			.p3 span{
				color: #ff9b00; padding-left: 20px;
			}
	</style>
</head>
<body>

<div class="main">
	<div class="left">
		<br>
		<div class="profile-img"><img src="{{$informations->picture}}"></div>

		<div class="box-1">
			<div class="heading">
				<p>CONTACT</p>
			</div>
			<p class="p1">{{$user->email}}</p>
            <p class="p1">{{$informations->phone}}</p>
			<p class="p1">{{$informations->address}}</p>
            <p class="p1">{{$informations->linkedin_url}}</p>
			<p class="p1">{{$informations->website_url}}</p>
		</div>

		<div class="box-1">
			<div class="heading">
				<p>SKILLS</p>
			</div>
			@foreach ($skills["skills"] as $skill)
			<p class="p1">{{$skill}}</p>
			@endforeach
		</div>
		<br>

		<div class="box-1">
			<div class="heading">
				<p>HOBBIES</p>
			</div>
			@foreach ($skills["hobbies"] as $hobbie)
			<p class="p1">{{$hobbie}}</p>
			@endforeach
		</div>
		<br>
		<div class="box-1">
			<div class="heading">
				<p>LANGUAGES</p>
			</div>
			@foreach ($skills["languages"] as $lang => $score)
            <p class="p1">{{$lang}} : {{$score}}</p>
			@endforeach
			
		</div>

	</div>


	<div class="right">
		<div class="name-div">
			<h1>{{$informations->first_name}}</h1>
			<p>{{$informations->last_name}}</p>
		</div>

		<div class="box-2">
			<h2>BIOGRAPHY</h2>
			<p class="p2">
				{{$informations->biography}}
			</p>
		</div>
		<div class="box-2">
			<h2>EDUCATION</h2>
			@foreach ($educations as $education)
			<p class="p3">{{$education->start_date}} / {{$education->end_date}}<span>{{$education->degree}} | {{$education->school}}</span>
            </p>
			<p class="p2">
				{{$education->description}}
			</p>
			@endforeach
		</div>


		<div class="box-2">
			<h2>EXPERIENCE</h2>
			@foreach ($experiences as $experience)
			<p class="p3">{{$experience->start_date}} / {{$experience->end_date}}<span>{{$experience->title}}
				({{$experience->company_name}})</span>
            </p>
            <p class="p4">Location : {{$experience->location}}</span>
			<p class="p2">
				{{$experience->description}}
			</p>
			@endforeach
		</div>

	</div>
</div>




</body>
</html>