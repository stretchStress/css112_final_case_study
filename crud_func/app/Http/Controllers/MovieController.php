<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index() {
        $movies = Movie::all();
        return view('movies.index', compact('movies'));
    }

    public function create() {
        return view('movies.create');
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'genre' => 'required',
            'release_year' => 'required|digits:4|integer',
        ]);

        Movie::create($request->all());
        return redirect()->route('movies.index')->with('success', 'Movie added!');
    }

    public function show(Movie $movie) {
        return view('movies.show', compact('movie'));
    }

    public function edit(Movie $movie) {
        return view('movies.edit', compact('movie'));
    }

    public function update(Request $request, Movie $movie) {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'genre' => 'required',
            'release_year' => 'required|digits:4|integer',
        ]);

        $movie->update($request->all());
        return redirect()->route('movies.index')->with('success', 'Movie updated!');
    }

    public function destroy(Movie $movie) {
        $movie->delete();
        return redirect()->route('movies.index')->with('success', 'Movie deleted!');
    }
}
