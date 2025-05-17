<div class="mb-3">
    <label>Title</label>
    <input type="text" name="title" value="{{ old('title', $movie->title ?? '') }}" class="form-control">
</div>
<div class="mb-3">
    <label>Genre</label>
    <input type="text" name="genre" value="{{ old('genre', $movie->genre ?? '') }}" class="form-control">
</div>
<div class="mb-3">
    <label>Release Year</label>
    <input type="number" name="release_year" value="{{ old('release_year', $movie->release_year ?? '') }}" class="form-control">
</div>
<div class="mb-3">
    <label>Description</label>
    <textarea name="description" class="form-control">{{ old('description', $movie->description ?? '') }}</textarea>
</div>
<button type="submit" class="btn btn-success">Save</button>
<a href="{{ route('movies.index') }}" class="btn btn-secondary">Cancel</a>
