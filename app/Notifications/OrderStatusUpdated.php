<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderStatusUpdated extends Notification
{
    use Queueable;

    public function __construct(
        public Order $order,
        public string $oldStatus,
        public string $newStatus
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    private function label(string $st): string
    {
        return match ($st) {
            'en_attente' => 'En attente',
            'validee'    => 'Validée',
            'expediee'   => 'Expédiée',
            'livree'     => 'Livrée',
            'annulee'    => 'Annulée',
            default      => $st,
        };
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('SUPECO — Statut mis à jour (Commande #' . $this->order->id . ')')
            ->greeting('Bonjour ' . ($this->order->shipping_name ?? $notifiable->name) . ',')
            ->line('Le statut de votre commande a été mis à jour.')
            ->line('Ancien statut : ' . $this->label($this->oldStatus))
            ->line('Nouveau statut : ' . $this->label($this->newStatus))
            ->action('Voir ma commande', route('orders.show', $this->order))
            ->line('Merci.');
    }
}
