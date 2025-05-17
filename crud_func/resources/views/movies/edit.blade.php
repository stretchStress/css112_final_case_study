@extends('layout')

@section('content')
<h2>Update Movie</h2>
<form method="POST" action="{{ route('movies.update', $movie) }}">
    @csrf @method('PUT')
    @include('movies.form')
</form>
@endsection
