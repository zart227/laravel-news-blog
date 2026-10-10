<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function index(): Response
    {
        $tags = Tag::withCount('articles')->get();
        
        return Inertia::render('Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function show(Tag $tag): Response
    {
        $tag->load(['articles' => function ($query) {
            $query->with('tags')->latest();
        }]);

        return Inertia::render('Tags/Show', [
            'tag' => $tag
        ]);
    }

    public function adminIndex(): Response
    {
        $tags = Tag::withCount('articles')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Tags/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags',
            'description' => 'nullable|string'
        ]);

        Tag::create($validated);

        return Inertia::location(route('admin.tags.index'));
    }

    public function edit(Tag $tag): Response
    {
        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
            'description' => 'nullable|string'
        ]);

        $tag->update($validated);

        return Inertia::location(route('admin.tags.index'));
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return Inertia::location(route('admin.tags.index'));
    }
} 