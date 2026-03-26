<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    private array $allowedStatuses = [
        'nouveau',
        'en_cours',
        'traite',
    ];

    public function index()
    {
        $messages = ContactMessage::latest()
            ->paginate(10)
            ->through(fn ($m) => [
                'id' => $m->id,
                'type' => $m->type,
                'name' => $m->name,
                'email' => $m->email,
                'phone' => $m->phone,
                'subject' => $m->subject,
                'status' => $m->status ?: 'nouveau',
                'created_at' => optional($m->created_at)->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function show(ContactMessage $message)
    {
        return Inertia::render('Admin/Messages/Show', [
            'message' => [
                'id' => $message->id,
                'type' => $message->type,
                'name' => $message->name,
                'email' => $message->email,
                'phone' => $message->phone,
                'subject' => $message->subject,
                'message' => $message->message,
                'status' => $message->status ?: 'nouveau',
                'created_at' => optional($message->created_at)->format('d/m/Y H:i'),
            ],
            'allowedStatuses' => $this->allowedStatuses,
        ]);
    }

    public function updateStatus(Request $request, ContactMessage $message)
    {
        $data = $request->validate([
            'status' => ['required', 'in:' . implode(',', $this->allowedStatuses)],
        ]);

        $message->update([
            'status' => $data['status'],
        ]);

        return redirect("/admin/messages/{$message->id}")
            ->with('success', 'Statut du message mis à jour avec succès.');
    }
}