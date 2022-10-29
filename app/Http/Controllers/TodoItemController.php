<?php

namespace App\Http\Controllers;

use App\Models\TodoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoItemController extends Controller
{
    /**
     * [GET|HEAD] Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todoItems = TodoItem::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();
        return $todoItems;
    }

    /**
     * [POST] Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'item-contents' => 'required|max:100',
        ]);
        TodoItem::create([
            'user_id' => Auth::user()->id,
            'title' => $request->input('item-contents'),
            'is_done' => false,
        ]);
        return array('success' => true);
    }

    /**
     * [GET|HEAD] Display the specified resource.
     *
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\Response
     */
    public function show(TodoItem $todoItem, $id)
    {
        $item = TodoItem::where('id', $id)->where('user_id', Auth::user()->id)->first();
        if (!$item) return abort(404);
        return $item;
    }

    /**
     * [PUT|PATCH] Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TodoItem $todoItem, $id)
    {
        $item = TodoItem::where('id', $id)->where('user_id', Auth::user()->id)->first();
        if (!$item) return abort(403);
        $request->validate([
            'item-contents' => 'required|max:100',
        ]);
        $item->title = $request->input('item-contents');
        $item->save();
        return array('success' => true);
    }

    /**
     * [DELETE] Remove the specified resource from storage.
     *
     * @param  \App\Models\TodoItem  $todoItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodoItem $todoItem, $id)
    {
        TodoItem::where('id', $id)->where('user_id', Auth::user()->id)->delete();
        return array('success' => true);
    }

    /**
     * [PATCH] Update the specified resource in storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function done(Request $request, $id)
    {
        $item = TodoItem::where('id', $id)->where('user_id', Auth::user()->id)->first();
        $item->is_done = true;
        $item->save();
        return array('success' => true);
    }

    /**
     * [PATCH] Update the specified resource in storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function undone(Request $request, $id)
    {
        $item = TodoItem::where('id', $id)->where('user_id', Auth::user()->id)->first();
        $item->is_done = false;
        $item->save();
        return array('success' => true);
    }
}