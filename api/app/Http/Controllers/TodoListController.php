<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $todoLists = TodoList::all();
        return response()->json($todoLists);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        $todoList = new TodoList();
        $todoList->title = $request->input('title') ?? '';
        $todoList->save();
        $todoList->todos()->save((new Todo([
            'content' => '',
            'completed' => false,
        ])));
        return response()->json($todoList);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $todoList = TodoList::with([
            'todos' => function ($query) {
                $query->orderBy('order', 'asc');
            },
        ])->findOrFail($id);
        return response()->json($todoList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $todoList = TodoList::findOrFail($id);
        $todoList->update($request->all());
        return response()->json($todoList);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): \Illuminate\Http\JsonResponse
    {
        $todoList = TodoList::with('todos')->findOrFail($id);
        $todoList->todos->each->delete();
        $todoList->delete();
        return response()->json($todoList);
    }
}
