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
        return Inertia::render('Tags/Index', [
            'tags' => Tag::withCount('articles')->get()
        ]);
    }

    public function show(Tag $tag): Response
    {
        return Inertia::render('Tags/Show', [
            'tag' => $tag,
            'articles' => $tag->articles()
                ->with(['user', 'tags'])
                ->when(auth()->guest(), function ($query) {
                    $query->where('status', 'published');
                })
                ->latest()
                ->paginate(12)
        ]);
    }
} 