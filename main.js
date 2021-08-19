window.onload = function () {
    var blogApp = {
        data: function () {
            return {
                activities: [],
                tab: 'activities',
                participantsAmount: '1',
                savedActivities: [],
                storagedActivities: [],
                activityType: ''
            }
        },
        delimiters: ['{{', '}}'],
        computed: {},
        watch: {},
        methods: {
            findActivity: function (type) {
                fetch(`https://www.boredapi.com/api/activity?participants=${this.participantsAmount}&type=${this.activityType}`)
                    .then(response => response.json())
                    .then(response => {
                        this.activities = response;
                        this.activityType = response.type;
                    })
            },
            saveActivity: function () {
                this.savedActivities.push(this.activities);
                localStorage.setItem('activity', JSON.stringify(this.savedActivities));
            },
            fetchSavedActivities: function () {
                var activities = JSON.parse(localStorage.getItem('activity'));
                this.storagedActivities = activities;
            },
            clearSavedActivities: function () {
                localStorage.clear();
                this.storagedActivities = [];
            }
        },
        mounted: function () {
            this.findActivity('education');
            this.fetchSavedActivities();
        }
    };
    window.vue_results = Vue.createApp(blogApp).mount('#bored');
}