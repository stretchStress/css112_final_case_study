<!DOCTYPE html>
<html>
<head>
    <title>Movie CRUD</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: white;
        }
        header {
            background-color: purple;
            color: gold;
            padding: 20px;
            text-align: left;
        }
        h1 {
            margin: 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>Movie CRUD</h1>
    </header>

    <div class="container py-4">
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        @yield('content')
    </div>
</body>
</html>
