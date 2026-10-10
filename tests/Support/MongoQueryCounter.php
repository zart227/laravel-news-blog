<?php

namespace Tests\Support;

use MongoDB\Driver\Monitoring\CommandFailedEvent;
use MongoDB\Driver\Monitoring\CommandStartedEvent;
use MongoDB\Driver\Monitoring\CommandSubscriber;
use MongoDB\Driver\Monitoring\CommandSucceededEvent;

class MongoQueryCounter implements CommandSubscriber
{
    public int $queries = 0;

    public function commandStarted(CommandStartedEvent $event): void
    {
        if (in_array($event->getCommandName(), ['find', 'aggregate'], true)) {
            $this->queries++;
        }
    }

    public function commandSucceeded(CommandSucceededEvent $event): void {}

    public function commandFailed(CommandFailedEvent $event): void {}
}
