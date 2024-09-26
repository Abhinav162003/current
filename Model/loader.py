import os
import torch
import torchaudio
from torch.utils.data import Dataset

class AudioDataset(Dataset):
    def __init__(self, audio_dir, labels):
        self.audio_dir = audio_dir
        self.labels = labels  # list of labels (strings)

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        # Get the audio file path and corresponding label
        label = self.labels[idx]  # Use the label string
        audio_path = os.path.join(self.audio_dir, f"{label}.wav")  # Use label for filename

        # Load the waveform and sample rate
        waveform, sample_rate = torchaudio.load(audio_path)

        # Pad or truncate the waveform to a fixed size (160,000 samples)
        target_length = 160000  # Target: 10 seconds at 16kHz
        original_size = waveform.size(1)

        if original_size < target_length:
            # Pad waveform if it's shorter than the target length
            padding = target_length - original_size
            waveform = torch.nn.functional.pad(waveform, (0, padding))  # Right pad
        else:
            # Truncate waveform if it's longer than the target length
            waveform = waveform[:, :target_length]

        # Debugging output
        print(f"Processed: {audio_path}, Original size: {original_size}, New size: {waveform.size(1)}")

        return waveform, sample_rate, label


def custom_collate_fn(batch):
    # Unpack the batch
    waveforms, sample_rates, labels = zip(*batch)

    # Pad sequences in the batch if needed (batch_first=True ensures batch size comes first)
    waveforms_padded = torch.nn.utils.rnn.pad_sequence(waveforms, batch_first=True)

    # Return as batch of tensors for waveforms and labels as they are
    return waveforms_padded, sample_rates, labels
