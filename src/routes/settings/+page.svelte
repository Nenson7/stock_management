<script lang="ts">
	import { enhance } from '$app/forms';
	import UserIcon from '@lucide/svelte/icons/user';
	import UserPlusIcon from '@lucide/svelte/icons/user-plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

	let { data, form } = $props();
	let showAddModal = $state(false);
</script>

<div class="space-y-6">
	<header class="flex justify-between items-center">
		<div>
			<h1 class="h1">System Settings</h1>
			<p class="opacity-60">Manage users and system configurations.</p>
		</div>
		<button class="btn variant-filled-primary" onclick={() => showAddModal = !showAddModal}>
			<UserPlusIcon class="size-4 mr-2" />
			Add User
		</button>
	</header>

	{#if showAddModal}
		<div class="card p-6 border border-surface-200-800 bg-surface-100-900 shadow-xl rounded-xl mb-6">
			<h2 class="h2 mb-4">Add New User</h2>
			<form method="POST" action="?/addUser" use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') showAddModal = false;
				};
			}} class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<label class="label">
					<span>Full Name</span>
					<input class="input" type="text" name="name" placeholder="John Doe" />
				</label>
				
				<label class="label">
					<span>Username</span>
					<input class="input" type="text" name="username" required placeholder="johndoe" />
				</label>

				<label class="label">
					<span>Password</span>
					<input class="input" type="password" name="password" required placeholder="••••••••" />
				</label>

				<label class="label">
					<span>Role</span>
					<select class="select" name="role" required>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</label>

				<div class="md:col-span-2 flex justify-end gap-2 pt-2">
					<button type="button" class="btn variant-soft" onclick={() => showAddModal = false}>Cancel</button>
					<button type="submit" class="btn variant-filled-primary">Create User</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="card bg-surface-100-900 border border-surface-200-800 rounded-xl overflow-hidden">
		<header class="p-4 border-b border-surface-200-800">
			<h3 class="h3">Users</h3>
		</header>
		<div class="table-container">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>User</th>
						<th>Username</th>
						<th>Role</th>
						<th class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.users as user (user.id)}
						<tr>
							<td>
								<div class="flex items-center gap-3">
									<div class="size-8 rounded-full bg-surface-200-800 flex items-center justify-center">
										<UserIcon class="size-4" />
									</div>
									<span class="font-bold">{user.name || 'No Name'}</span>
								</div>
							</td>
							<td>{user.username}</td>
							<td>
								<span class="badge {user.role === 'admin' ? 'variant-filled-secondary' : 'variant-soft-surface'}">
									{user.role}
								</span>
							</td>
							<td class="text-right">
								<form method="POST" action="?/deleteUser" use:enhance class="inline">
									<input type="hidden" name="id" value={user.id} />
									<button class="btn-icon btn-icon-sm variant-soft-error" disabled={data.user?.id === user.id}>
										<TrashIcon class="size-4" />
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
