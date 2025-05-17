@extends('layout')

@section('content')
<a href="{{ route('movies.create') }}" class="btn mb-3" style="background-color:purple; color:gold;">Add Movie</a>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th style="width: 150px;">Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach($movies as $movie)
        <tr>
            <td>{{ $movie->title }}</td>
            <td>{{ $movie->genre }}</td>
            <td>{{ $movie->release_year }}</td>
            <td class="text-nowrap" style="width: 150px;">
                <a href="{{ route('movies.show', $movie) }}" class="btn btn-sm" style="background-color:purple; color:gold;">View</a>
                <a href="{{ route('movies.edit', $movie) }}" class="btn btn-sm" style="background-color:purple; color:gold;">Edit</a>
                <form action="{{ route('movies.destroy', $movie) }}" method="POST" class="d-inline">
                    @csrf @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Delete this movie?')">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection
