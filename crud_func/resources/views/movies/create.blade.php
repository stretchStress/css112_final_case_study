@extends('layout')

@section('content')
<h2>Add Movie</h2>
<form method="POST" action="{{ route('movies.store') }}">
    @csrf
    @include('movies.form')
</form>
@endsection
