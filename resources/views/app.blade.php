<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Address Book</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- helper packages -->
    <link href="{{ asset('css/vender.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootcards.css') }}" rel="stylesheet">
    <script src="{{ asset('js/vender.js') }}"></script>


    <!-- app files -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}"></script>


</head>

<body ng-app="App" ng-controller="AppController">
    <!-- <body > -->

    <!-- Navigation bar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <a class="navbar-brand" title="Address Book" href="/">Address Book</a>
            <p class="navbar-text" ng-show="loading"><i class="fa fa-spinner fa-pulse fa-2x"></i></p>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#contacts" <i="" class="fa fa-users"> contacts</a>
                    </li>
                    <li>
                        <a href="#" ng-click="logout()" <i="" class="fa fa-sign-out"> Log Out</a>
                    </li>
                    <li ng-show="isAuthenticated">
                        <a href="#register" <i="" class="fa fa-user-plus"> New User</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container">
        <div id="content-div">
            <ng-view></ng-view>
            @yield('content')
        </div>

        <!-- display back end errors -->
        <div class="">
            @if($errors->any())
            <ul class="alert alert-danger">
                @foreach($errors->all() as $error)
                <li> {{ $error }} </li>
                </script>
                @endforeach
            </ul>
            @endif
        </div>
    </div>
</body>

</html>
