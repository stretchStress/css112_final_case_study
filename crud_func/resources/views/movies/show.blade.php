@extends('layout')

@section('content')
<div class="card shadow-sm">
    <div class="card-header bg-purple text-gold">
        <h3 class="mb-0">{{ $movie->title }}</h3>
    </div>
    <div class="card-body">
        <p><strong>Genre:</strong> {{ $movie->genre }}</p>
        <p><strong>Release Year:</strong> {{ $movie->release_year }}</p>
        <p><strong>Description:</strong></p>
        <p>{{ $movie->description }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <a href="{{ route('movies.index') }}" class="btn btn-secondary">Back to List</a>
        <a href="{{ route('movies.edit', $movie->id) }}" class="btn btn-warning text-purple fw-bold">Edit Movie</a>
    </div>
</div>
@endsection
